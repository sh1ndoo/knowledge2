
### **Подход 1: Прямое использование `b2sdk`**

Этот подход дает вам полный контроль над процессом, но требует написания большего количества кода для взаимодействия с B2 API.

**1. Установка SDK:**

```bash
pip install b2sdk
```

**2. Настройка в Django (`settings.py`):** ([[Настройки проекта (settings.py)]])

Крайне **не рекомендуется** хранить ключи API прямо в `settings.py`. Используйте переменные окружения или другие методы управления секретами (например, `python-dotenv`, HashiCorp Vault).

```python
# settings.py
import os
from dotenv import load_dotenv

load_dotenv() # Загружает переменные из файла .env

B2_ACCOUNT_ID = os.environ.get('B2_ACCOUNT_ID') # Это ваш Key ID
B2_APPLICATION_KEY = os.environ.get('B2_APPLICATION_KEY') # Это ваш Application Key (секретный)
B2_BUCKET_NAME = os.environ.get('B2_BUCKET_NAME') # Имя вашего бакета

# Убедитесь, что переменные загружены
if not all([B2_ACCOUNT_ID, B2_APPLICATION_KEY, B2_BUCKET_NAME]):
    # Логирование ошибки или выбрасывание исключения в зависимости от вашей политики
    print("Ошибка: Не все переменные окружения для Backblaze B2 установлены!")
    # raise ImproperlyConfigured("Не все переменные окружения для Backblaze B2 установлены!")

```

Создайте файл `.env` в корне вашего проекта (добавьте его в `.gitignore`!):

```
# .env
B2_ACCOUNT_ID=ВАШ_KEY_ID
B2_APPLICATION_KEY=ВАШ_APPLICATION_KEY
B2_BUCKET_NAME=имя-вашего-бакета
```

**3. Логика загрузки файла (Пример в `views.py`):**

Предположим, у вас есть модель и форма для загрузки изображения.

```python
# models.py
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Храним не сам файл, а его имя (ключ) в B2 или полный URL
    profile_picture_b2_filename = models.CharField(max_length=255, blank=True, null=True)
    # Можно добавить метод для получения URL
    # def get_profile_picture_url(self):
    #    if self.profile_picture_b2_filename:
    #        # Здесь логика получения URL из B2 (см. ниже)
    #        pass
    #    return 'path/to/default/image.jpg'

# forms.py
from django import forms

class ProfilePictureForm(forms.Form):
    picture = forms.ImageField()

# views.py
import uuid
from django.shortcuts import render, redirect
from django.conf import settings
from b2sdk.v2 import B2Api, InMemoryAccountInfo
from .forms import ProfilePictureForm
from .models import UserProfile # Предполагаем, что модель связана с User

# --- Вспомогательная функция для инициализации B2 API ---
# (Лучше вынести в отдельный модуль/сервис и кешировать инстанс B2Api)
def get_b2_api():
    info = InMemoryAccountInfo()
    b2_api = B2Api(info)
    b2_api.authorize_account("production", settings.B2_ACCOUNT_ID, settings.B2_APPLICATION_KEY)
    return b2_api

def upload_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['picture']
            
            # 1. Сгенерировать уникальное имя файла для B2
            # Используем UUID чтобы избежать коллизий
            file_extension = os.path.splitext(uploaded_file.name)[1]
            unique_filename = f"profile_pics/{uuid.uuid4()}{file_extension}"

            try:
                # 2. Инициализировать B2 API
                b2_api = get_b2_api()
                bucket = b2_api.get_bucket_by_name(settings.B2_BUCKET_NAME)

                # 3. Загрузить файл
                # Читаем содержимое файла в память (для больших файлов могут быть нужны другие подходы)
                file_content = uploaded_file.read()
                content_type = uploaded_file.content_type

                uploaded_b2_file = bucket.upload_bytes(
                    data_bytes=file_content,
                    file_name=unique_filename, # Уникальное имя файла в бакете
                    content_type=content_type
                )

                # 4. Сохранить имя файла (или ID) в модели Django
                profile, created = UserProfile.objects.get_or_create(user=request.user)
                profile.profile_picture_b2_filename = uploaded_b2_file.file_name # Сохраняем имя файла B2
                profile.save()

                # Можно перенаправить пользователя или вернуть успешный ответ
                return redirect('profile_view') # Пример

            except Exception as e:
                # Обработка ошибок (логирование, сообщение пользователю)
                print(f"Ошибка загрузки в B2: {e}")
                # form.add_error(None, "Не удалось загрузить изображение.") # Добавить ошибку в форму

    else:
        form = ProfilePictureForm()
    
    return render(request, 'upload_form.html', {'form': form})

```

**4. Получение URL для отображения в шаблоне:**

Вам нужно будет получить URL файла из B2.

```python
# В модели или во view

def get_b2_download_url(filename):
    if not filename:
        return None
    try:
        b2_api = get_b2_api() # Получаем инициализированный API
        download_url = b2_api.get_download_url_for_file_name(settings.B2_BUCKET_NAME, filename)
        return download_url
    except Exception as e:
        print(f"Ошибка получения URL из B2: {e}")
        return None

# Пример использования в модели
class UserProfile(models.Model):
    # ... поля ...
    profile_picture_b2_filename = models.CharField(max_length=255, blank=True, null=True)

    def get_profile_picture_url(self):
        return get_b2_download_url(self.profile_picture_b2_filename) or 'path/to/default/image.jpg'

# В шаблоне Django (template.html)
# <img src="{{ user_profile.get_profile_picture_url }}" alt="Profile Picture">
```

**Плюсы:**
*   Полный контроль над API B2.
*   Можно использовать все специфичные функции `b2sdk`.

**Минусы:**
*   Больше кода для написания и поддержки.
*   Нужно вручную обрабатывать загрузку в `views.py`.
*   Нужно реализовать получение URL.

---

### **Подход 2: Использование `django-storages`**

Это более "Django-way". Пакет `django-storages` предоставляет бэкенды для различных облачных хранилищ, включая Backblaze B2, и интегрируется с полями `FileField` и `ImageField` Django.

**1. Установка:**

```bash
pip install django-storages[b2]
# '[b2]' автоматически установит b2sdk как зависимость
```

**2. Настройка в `settings.py`:**

Добавьте `storages` в `INSTALLED_APPS`. Настройте параметры B2 и укажите `django-storages` использовать B2 как бэкенд для хранения файлов по умолчанию (или для конкретного поля).

```python
# settings.py
INSTALLED_APPS = [
    # ... другие приложения
    'storages',
    # ... ваши приложения
]

STORAGES = {  
    "default": {  
        "BACKEND": "storages.backends.s3.S3Storage",  
        "OPTIONS": {  
            # --- Аутентификация ---  
            # Используем ключи из .env            # (Используем альтернативные имена из документации django-storages)            "access_key": B2_KEY_ID,  
            "secret_key": B2_APPLICATION_KEY,  
  
            # --- Настройки бакета и эндпоинта ---  
            "bucket_name": B2_BUCKET_NAME,  
            # endpoint_url КРАЙНЕ ВАЖЕН для B2 и других S3-совместимых!  
            "endpoint_url": "https://s3.us-east-005.backblazeb2.com",  # Например, 's3.us-east-005.backblazeb2.com'  
  
            # --- Настройки генерации URL и доступа ---            "querystring_auth": True,  # <-- Генерировать подписанные URL (для приватных бакетов)  
            "querystring_expire": 3600,  # Время жизни URL в секундах (1 час по умолчанию)  
            "signature_version": 's3v4',  # <-- ВАЖНО для B2!  
            "default_acl": None,  # B2 обычно не использует ACL как S3, лучше None или private  
  
            # --- Опционально, но полезно ---            # Имя региона может помочь boto3, хотя endpoint_url важнее            "region_name": 'us-east-005',  # Укажите ваш регион B2  
            "object_parameters": {  # Доп. параметры для ВСЕХ загружаемых файлов  
                'CacheControl': 'max-age=86400',  # Кэшировать на 1 день  
            },  
            "file_overwrite": False,  # Не перезаписывать файлы с тем же именем  
            "location": "media",  # Префикс (папка) внутри бакета для медиафайлов  
            "use_ssl": True,  
        },  
    },  
    "staticfiles": {  
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",  
    },  
}
```


**3. Модель Django:**

Теперь вы можете использовать стандартные `FileField` или `ImageField`. `django-storages` автоматически перехватит сохранение файла и загрузит его в B2.

```python
# models.py
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Используем стандартный ImageField. Django-storages позаботится об остальном.
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    # upload_to будет использоваться как префикс внутри AWS_LOCATION (если он задан)
    # или внутри корня бакета.
```

**4. Формы и Представления (Forms & Views):**

Ваш код в `forms.py` и `views.py` становится намного проще, как при работе с локальным хранилищем.

```python
# forms.py
from django import forms
from .models import UserProfile

class ProfilePictureModelForm(forms.ModelForm): # Используем ModelForm
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

# views.py
from django.shortcuts import render, redirect
from .forms import ProfilePictureModelForm
from .models import UserProfile

def upload_profile_picture_django_storages(request):
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = ProfilePictureModelForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save() # Django-storages автоматически загрузит файл в B2 здесь!
            return redirect('profile_view')
    else:
        form = ProfilePictureModelForm(instance=profile)
    
    return render(request, 'upload_form.html', {'form': form})
```

**5. Отображение в шаблоне:**

Доступ к URL файла осуществляется через стандартный атрибут `.url` поля `ImageField` или `FileField`.

```html
<!-- template.html -->
{% if user_profile.profile_picture %}
    <img src="{{ user_profile.profile_picture.url }}" alt="Profile Picture">
{% else %}
    <img src="path/to/default/image.jpg" alt="Default Picture">
{% endif %}
```
`django-storages` автоматически сгенерирует правильный (возможно, подписанный, если `AWS_QUERYSTRING_AUTH = True`) URL для доступа к файлу в B2.

**Плюсы:**
*   Гораздо меньше кода для написания.
*   Используются стандартные механизмы Django (`FileField`, `ImageField`, `ModelForm`).
*   Легче переключиться на другое хранилище в будущем (просто изменив настройки).

**Минусы:**
*   Меньше прямого контроля над специфичными функциями B2 API (если они вам нужны).
*   Зависимость от сторонней библиотеки `django-storages`.

**Рекомендация:**

Для большинства случаев использования, особенно для стандартной загрузки пользовательских файлов, **использование `django-storages` является предпочтительным подходом**. Он значительно упрощает код и лучше интегрируется с Django. Прямое использование SDK может понадобиться для более сложных сценариев или если вам нужны функции B2, не поддерживаемые `django-storages`.

Не забудьте обработать ошибки, настроить CORS на вашем бакете B2 (если нужно загружать файлы напрямую из браузера) и следить за безопасностью ваших ключей API.
