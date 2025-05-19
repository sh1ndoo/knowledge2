*   **`INSTALLED_APPS`:**
    *   Список строк, указывающих на все приложения, используемые в проекте (встроенные Django и ваши).
    *   Django ищет модели, шаблоны, теги, команды управления и т.д. в этих приложениях.
    *   Обычно содержит пути к классам конфигурации приложений (из `apps.py`).
        ```python
        INSTALLED_APPS = [
            'django.contrib.admin',
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.messages',
            'django.contrib.staticfiles',
            'my_app.apps.MyAppConfig', # Ваше приложение
            # ... другие приложения ...
        ]
        ```
*   **`TEMPLATES`:**
    *   Список словарей, определяющих конфигурацию движков шаблонов.
    *   **Ключи:**
        *   `'BACKEND'`: Путь к классу движка шаблонов (обычно `'django.template.backends.django.DjangoTemplates'`).
        *   `'DIRS'`: Список путей к каталогам, где Django будет искать шаблоны на уровне проекта.
        *   `'APP_DIRS'`: `True`, если Django должен искать шаблоны в подкаталогах `templates` установленных приложений (`INSTALLED_APPS`).
        *   `'OPTIONS'`: Словарь с дополнительными опциями, например:
            *   `'context_processors'`: Список путей к функциям, которые добавляют переменные в контекст *каждого* шаблона (например, `request`, `user`).
            
        ```python
        TEMPLATES = [
            {
                'BACKEND': 'django.template.backends.django.DjangoTemplates',
                'DIRS': [BASE_DIR / 'templates'], # Папка templates в корне проекта
                'APP_DIRS': True,
                'OPTIONS': {
                    'context_processors': [
                        'django.template.context_processors.debug',
                        'django.template.context_processors.request',
                        'django.contrib.auth.context_processors.auth',
                        'django.contrib.messages.context_processors.messages',
                    ],
                },
            },
        ]
        ```
