---
subtitle: 
tags: []
date created: 2025-05-04T02:10
date modified: 2025-05-25T21:52
---
### Введение  
  
[Backblaze](https://www.backblaze.com/) мне понравился бесплатным тарифом на 10гб без каких то подвохов, всё прекрасно работает, разве что скорость загрузки не блещет т.к сервера находятся явно не рядом с Сибирью :(  
Тем не менее этого более чем достаточно для обучения и всяких пет проектов (главное не забывайте сжимать файлы, иначе 10гб очень быстро улетит(например при помощи [[imagekit|imagekit]])), так что разберем способы подключения стороннего хранилища именно на его примере  
>[!note]  
>Таким же способом можно подключить и [Cloudflare R2](https://www.cloudflare.com/plans/developer-platform/)  
### **Использование `django-storages`**  
  
Пакет `django-storages`([доки](https://django-storages.readthedocs.io/en/latest/index.html)) предоставляет бэкенды для различных облачных хранилищ, включая Backblaze B2, и интегрируется с полями `FileField` и `ImageField` Django.  
  
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
            "access_key": B2_KEY_ID,    
            "secret_key": B2_APPLICATION_KEY,    
    
            # --- Настройки бакета и эндпоинта ---    
            "bucket_name": B2_BUCKET_NAME,    
            "endpoint_url": "url",  # Например, 's3.us-east-005.backblazeb2.com'    
    
            # --- Настройки генерации URL и доступа ---              
            "querystring_auth": True,  # <-- Генерировать подписанные URL (для приватных бакетов)    
            "querystring_expire": 3600,  # Время жизни URL в секундах (1 час по умолчанию)    
            "signature_version": 's3v4',   
            "default_acl": None,  
    
            "region_name": 'us-east-005',  # Укажите ваш регион B2    
            "object_parameters": {    
                'CacheControl': 'max-age=86400, public, immutable',    
                'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',    
            },    
            "file_overwrite": False,  # Не перезаписывать файлы с тем же именем    
            "location": "media",  # Префикс (папка) внутри бакета для медиафайлов    
            "use_ssl": True,    
        },    
    },    
    "staticfiles": {    
	    # Если планируете хранить статические файлы в локальном хранилище или повторите код выше  
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",    
    },    
}  
```  
> [!tip]- Работа с кешем для приватных бакетов  
>  Если вы используете подписанные url (а иные и невозможны если у вас только карты МИР), то кеширование работать не будет, для этого нужно переопределить метод url в классе бекенда, я сделал так:  
>  ```python  
> import hashlib    
> from django.conf import settings    
> from django.core.cache import cache    
> from storages.backends.s3 import S3Storage    
>  
> class CachedS3Storage(S3Storage):    
>     """ adds caching for temporary urls """    
>    
>     def url(self, name):    
>        key = hashlib.md5(f"CachedS3Boto3Storage_{name}".encode()).hexdigest()    
>        result = cache.get(key)    
>        if result:    
>            return result    
>    
>        result = super().url(name)    
>    
>        timeout = self.querystring_expire    
>        timeout = int(timeout*.75)    
>        cache.set(key, result, timeout)    
>    
>        return result  
> ```  
  
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