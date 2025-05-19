
*   Содержит список `urlpatterns`, определяющий маршруты URL для приложения или всего проекта.
*   Использует функцию `path()` (или `re_path()` для регулярных выражений).
    ```python
    # Пример urls.py приложения
    from django.urls import path  
    from . import views # Импорт представлений из текущего каталога

    urlpatterns = [
        # Путь к главной странице приложения (пустая строка после префикса проекта)
        path('', views.index, name='app_index'), 
        # Путь с параметром
        path('article/<int:article_id>/', views.article_detail, name='article_detail'), 
    ]
    # views.index - функция-представление, которая выполнится при переходе 
    # по URL, соответствующему этому пути.
    # name='...' - имя URL, используется для reverse() и тега {% url %}
    ```
*   **Конвертеры путей:** Используются для извлечения параметров из URL.
    *   Синтаксис: `path('route/<converter_name:variable_name>/', ...)`
    *   **Стандартные конвертеры:**
        *   `str`: Любая строка без слэша (`/`). Пример: `.../<str:category_slug>/`
        *   `int`: Любое целое число. Пример: `.../<int:post_id>/`
        *   `path`: Любая строка, включая слэши. Пример: `.../<path:file_path>/`
        *   `slug`: Строка из букв ASCII, цифр, дефиса и подчеркивания. Пример: `.../<slug:article_slug>/`
        *   `uuid`: Соответствует формату UUID. Пример: `.../<uuid:user_uuid>/`
    *   **Создание пользовательских конвертеров:**
        1.  Создать класс конвертера в файле (например, `converters.py`).
            ```python
            # converters.py (в приложении)
            class FourDigitYearConverter:
                regex = r'[0-9]{4}' # Регулярное выражение для соответствия

                # Метод для преобразования строки из URL в Python-объект
                def to_python(self, value):
                    return int(value)

                # Метод для преобразования Python-объекта в строку для URL
                def to_url(self, value):
                    return f"{value:04d}" # Форматируем как 4 цифры
            ```
        2.  Зарегистрировать и использовать конвертер в `urls.py`.
            ```python
            # urls.py (в приложении)
            from . import converters
            from django.urls import path, register_converter
            from . import views

            # Регистрируем конвертер под именем 'year4'
            register_converter(converters.FourDigitYearConverter, 'year4')

            urlpatterns = [
                path('archive/<year4:year>/', views.archive, name='archive'),
                # ...
            ]
            ```
*   **Обработка ошибок URL (в основном `urls.py` проекта):**
    *   Можно определить пользовательские представления для стандартных ошибок HTTP.
    *   `handler400 = 'views.bad_request_view'`
    *   `handler403 = 'views.permission_denied_view'`
    *   `handler404 = 'views.page_not_found_view'`
    *   `handler500 = 'views.server_error_view'`
    *   Функции-обработчики должны принимать `request` и (для 4xx/500) `exception` в качестве аргументов.
        ```python
        # Пример обработчика 404 в views.py
        from django.http import HttpResponseNotFound

        def custom_page_not_found_view(request, exception):
            return HttpResponseNotFound('<h1>Страница не найдена :(</h1>') 
        ```
    *   **Вызов 404 из представления:** Используйте исключение `Http404`.
        ```python
        from django.http import HttpResponse, Http404

        def posts_list(request, year):
            if not (1990 <= year <= 2024): # Пример проверки
                raise Http404("Записи за такой год не найдены.")
            return HttpResponse(f"Записи за {year} год.")
