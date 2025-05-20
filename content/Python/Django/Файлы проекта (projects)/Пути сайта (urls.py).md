---
subtitle: 
tags: []
Описание: Описывает основные пути доступа к страницам сайта.
date created: 2025-04-19T04:42
date modified: 2025-05-21T00:20
---
*   Часто использует `include()` для делегирования обработки URL приложениям.
    ```python
    # urls.py проекта
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('admin/', admin.site.urls),
        # Все URL, начинающиеся с 'blog/', будут обрабатываться в blog/urls.py
        path('blog/', include('blog.urls')), 
        # URL для другого приложения
        path('shop/', include('shop.urls')), 
        # Можно определить URL и прямо здесь
        # path('', views.home_page, name='home'), 
    ]
    ```
