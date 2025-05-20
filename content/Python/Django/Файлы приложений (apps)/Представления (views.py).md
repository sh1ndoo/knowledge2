---
subtitle: 
tags: []
date created: 2025-04-19T03:29
date modified: 2025-05-21T00:20
---

*   **Перенаправления (Redirects):**
    *   **Функция `redirect()`:**
        *   Перенаправляет пользователя на другой URL.
        *   Может принимать имя URL-шаблона (из `urls.py`), абсолютный или относительный URL. Использование имени предпочтительнее (избегает хардкодинга).
        *   `permanent=False` (по умолчанию) - временное перенаправление (HTTP 302), `permanent=True` - постоянное (HTTP 301).
        ```python
		# views.py
        from django.shortcuts import redirect
        from django.http import HttpResponse

        def some_view(request):
            # ... логика ...
            # Перенаправление по имени URL
            return redirect('profile_page_name', permanent=False) 

        def index_by_slug(request, index_id):
            if index_id == 'apo':
                # Перенаправление по имени 'apo' с передачей параметра permanent
                return redirect('apo', permanent=False) 
            return HttpResponse(f"Hello, world. You're at the polls index str {index_id}")
        
        # urls.py (пример соответствующего URL)
        from .views import some_profile_view, apo_view
        urlpatterns = [
            path('profile/', some_profile_view, name='profile_page_name'),
            path('apo/', apo_view, name='apo'),
        ]
        ```
        *   **Важно (Абсолютные vs Относительные URL в `redirect`):**
            1.  **Абсолютный URL (начинается с `/`):** Указывает путь от корня текущего домена. `redirect('/path/to/redirect/')` -> `https://example.com/path/to/redirect/`.
            2.  **Относительный URL (не начинается с `/`):** Строится относительно *текущего* URL. Если текущий URL `https://example.com/somepage/`, то `redirect('add/this/')` перенаправит на `https://example.com/somepage/add/this/`.
    ---
    *   **Функция `reverse()`:**
        *   Используется для получения URL по его имени (заданному в `urls.py`) и параметрам. Возвращает строку URL. Полезна для избежания хардкодинга URL в коде.
        *   Если в `urls.py` адрес определен с конвертером (например, `<int:pk>`), `reverse` требует передачи соответствующих аргументов.
        ```python
        from django.urls import reverse
        reverse(viewname, urlconf=None, args=None, kwargs=None, current_app=None)
        ```
        *   `viewname`: Имя URL-шаблона (из `name='...'` в `path()`) или вызываемый объект представления. (Обязательный)
        *   `urlconf`: Конфигурация URL для поиска (необязательный).
        *   `args`: Кортеж/список позиционных аргументов для URL (если есть конвертеры).
        *   `kwargs`: Словарь именованных аргументов для URL.
        *   `current_app`: Имя текущего приложения (для пространств имен URL).
        *   **Пример:**
            ```python
            from django.urls import reverse

            def my_view(request):
                # ...
                # Получаем URL для представления 'article_detail' с pk=10
                detail_url = reverse('article_detail', kwargs={'pk': 10}) 
                print(detail_url) # Вывод: /articles/10/ (зависит от urls.py)
                # ...
            ```
    ---
    *   **Классы перенаправления:**
        *   `HttpResponseRedirect`: Используется для *временного* перенаправления (код состояния HTTP 302). Принимает URL как обязательный аргумент.
            ```python
            # Пример:
            from django.http import HttpResponseRedirect
            
            redirect_response = HttpResponseRedirect('/new_page/') 
            # URL сохраняется в атрибуте redirect_response.url
            ```
        *   `HttpResponsePermanentRedirect`: Используется для *постоянного* перенаправления (код состояния HTTP 301). Создается аналогично `HttpResponseRedirect`.
            ```python
            # Пример:
            from django.http import HttpResponsePermanentRedirect
            
            permanent_redirect = HttpResponsePermanentRedirect('/permanently_moved_page/')
            ```
---

*   **Функции для рендеринга:**
    *   **`render(request, template_name, context=None, ...)` -> `HttpResponse`**
        *   Загружает шаблон, заполняет его данными из словаря `context` и возвращает готовый `HttpResponse`.
        *   **Аргументы:**
            *   `request`: Объект `HttpRequest`. (Обязательный)
            *   `template_name`: Имя файла шаблона (строка). (Обязательный)
            *   `context`: Словарь с данными для шаблона. (Необязательный)
            *   `content_type`: MIME-тип ответа (по умолч. `text/html`).
            *   `status`: Код состояния HTTP (по умолч. `200`).
            *   `using`: Имя движка шаблонов (если их несколько).
        ```python
        # views.py
        from django.shortcuts import render

        def my_view(request):
            context = {'name': 'John Doe', 'items': ['apple', 'banana']}
            return render(request, 'myapp/my_template.html', context) 
        ```
    *   **`render_to_string(template_name, context=None, ...)` -> `str`**
        *   Загружает и рендерит шаблон, но возвращает результат в виде строки Python, а не `HttpResponse`. Полезно для генерации HTML для email, AJAX-ответов и т.д.
        *   **Аргументы:**
            *   `template_name`: Имя файла шаблона. (Обязательный)
            *   `context`: Словарь с данными.
            *   `request`: Объект `HttpRequest` (необязателен, но нужен для некоторых тегов/контекст-процессоров).
            *   `using`: Имя движка шаблонов.
        ```python
        # views.py
        from django.template.loader import render_to_string
        from django.http import JsonResponse

        def get_item_html(request, item_id):
            item = # ... получить объект item ...
            context = {'item': item}
            html_string = render_to_string('myapp/item_snippet.html', context)
            return JsonResponse({'html': html_string})
