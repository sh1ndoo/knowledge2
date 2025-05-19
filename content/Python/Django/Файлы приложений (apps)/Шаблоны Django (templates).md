

Основа для создания динамических HTML-страниц. Сочетают статический HTML с переменными и управляющей логикой Django Template Language (DTL).


*   **Директории:**
    *   Рекомендуется создавать подкаталог с именем приложения внутри `templates/` (`templates/<app_name>/`), чтобы избежать конфликтов имен шаблонов между приложениями. Путь к шаблону тогда будет `<app_name>/template.html`.
*   **Переменные:**
    *   Вставляются с помощью `{{ variable_name }}`.
    *   Доступ к атрибутам объекта: `{{ object.attribute }}`.
    *   Доступ к элементам словаря: `{{ dictionary.key }}`.
    *   Доступ к элементам списка по индексу: `{{ list.0 }}`.
    *   Вызов методов объекта (без аргументов): `{{ object.method }}`.
    *   **Нельзя:** `{{ title, name }}`
---
*   **Алгоритм поиска шаблонов:**
    1.  Сначала поиск в каталогах, указанных в списке `DIRS` в настройке `TEMPLATES` (`settings.py`).
    2.  Если не найден и `APP_DIRS` установлено в `True`, поиск в подкаталогах `templates` каждого приложения, перечисленного в `INSTALLED_APPS`.
    3.  Используется первый найденный шаблон.
    4.  Если шаблон не найден нигде, возбуждается исключение `TemplateDoesNotExist`.
    5.  **Кэширование:** Django кэширует скомпилированные шаблоны для производительности (в режиме `DEBUG=False`).
    6.  **Настройка:** Можно переопределить поиск с помощью `django.template.loader.get_template()`.
*   **Фильтры:** Применяются к переменным для их модификации.
    *   Синтаксис: `{{ variable|filter_name:"argument" }}`
    *   **Примеры:**
        *   `add`: `{{ value|add:"2" }}` (пытается сложить, может работать со строками/числами)
        *   `capfirst`: `{{ my_string|capfirst }}` (Первая буква заглавная)
        *   `upper`: `{{ my_string|upper }}` (ВСЕ БУКВЫ ЗАГЛАВНЫЕ)
        *   `lower`: `{{ my_string|lower }}` (все буквы строчные)
        *   `cut`: `{{ my_string|cut:" " }}` (Удаляет все пробелы)
        *   `default`: `{{ value|default:"Нет значения" }}` (Если `value` ложно (пусто, `None`, `False`, `0`))
        *   `divisibleby`: `{{ number|divisibleby:"3" }}` (Возвращает `True`, если `number` делится на 3)
        *   `first`: `{{ my_list|first }}` (Первый элемент списка/строки)
        *   `last`: `{{ my_list|last }}` (Последний элемент)
        *   `join`: `{{ my_list|join:", " }}` (Объединяет элементы списка в строку с разделителем)
        *   `length`: `{{ my_list|length }}` (Длина списка/строки)
        *   `slugify`: `{{ my_string|slugify }}` ("Some Title" -> "some-title")
    *   **Использование в Python (Не рекомендуется):**
        ```python
        from django.template.defaultfilters import slugify 
        slug = slugify(my_string) 
        ```
    *   **Создание пользовательских фильтров:**
        1.  В каталоге приложения создать папку `templatetags` (на одном уровне с `models.py`, `views.py`).
        2.  Внутри `templatetags` создать файл `__init__.py` (пустой).
        3.  Внутри `templatetags` создать Python-файл для фильтров (например, `custom_filters.py`).
        4.  Определить и зарегистрировать фильтры в этом файле:
            ```python
            # myapp/templatetags/custom_filters.py
            from django import template

            register = template.Library() # Экземпляр для регистрации

            @register.filter(name='multiply') # Регистрация с явным именем
            def multiply_filter(value, arg):
                try:
                    return value * arg
                except (ValueError, TypeError):
                    return ''
            
            @register.filter # Регистрация (имя = имя функции)
            def first_letters(value, count=1):
                try:
                    return value[:int(count)]
                except (ValueError, TypeError, IndexError):
                    return ''
            ```
        5.  Использовать в шаблонах после загрузки:
            ```django
            {% load custom_filters %} 
            
            {{ some_number|multiply:5 }}
            {{ some_string|first_letters:"3" }}
            ```*   **Теги:** Управляющие конструкции шаблона.
    *   Синтаксис: `{% tag_name arguments %}`
    *   **`{% for ... %}`:** Цикл по итерируемому объекту.
        ```html
        <ul>
          {% for item in item_list %}
            <li>{{ forloop.counter }}. {{ item.name }}</li>
          {% empty %}
            <li>Список пуст.</li>
          {% endfor %}
        </ul>
        ```
        *   Переменные внутри цикла (`forloop`): `forloop.counter` (1..N), `forloop.counter0` (0..N-1), `forloop.revcounter` (N..1), `forloop.revcounter0` (N-1..0), `forloop.first` (True для первой итерации), `forloop.last` (True для последней), `forloop.parentloop` (доступ к `forloop` внешнего цикла во вложенных циклах).
    *   **`{% if ... %}`:** Условный оператор.
        ```django
        {% if user.is_authenticated %}
          Привет, {{ user.username }}!
        {% elif user.is_staff %}
          Вход для персонала.
        {% else %}
          <a href="{% url 'login' %}">Войти</a>
        {% endif %}
        ```
    *   **`{% url ... %}`:** Генерация URL по имени из `urls.py`. Аналог `reverse()` для шаблонов.
        ```django
        <!-- Синтаксис -->
        {% url 'url-name' positional_arg1 positional_arg2 %}
        {% url 'url-name' keyword_arg1=value1 keyword_arg2=value2 %}

        <!-- Пример 1: Без аргументов -->
        <a href="{% url 'home' %}">Домашняя страница</a>

        <!-- Пример 2: С аргументом -->
        <a href="{% url 'article_detail' article.pk %}">{{ article.title }}</a> 
        
        <!-- Пример 3: В цикле -->
        <ul>
          <li><a href="{% url 'home' %}">Главная</a></li>
          {% for m in menu %}
            <li><a href="{% url m.url_name %}">{{ m.title }}</a></li>
          {% endfor %}
        </ul>
        ```
    *   **Теги наследования:**
        *   **`{% block <имя_блока> %}`:** Определяет именованный блок в родительском шаблоне, который может быть переопределен в дочернем.
            ```django
            <!-- base.html -->
            <!DOCTYPE html>
            <html>
	            <head>
		        <title>{% block title %}Стандартный заголовок{% endblock %}</title>
	            </head>
	            <body>
		            <main>
		            {% block content %}{% endblock %}
		            </main>
	            </body>
            </html>
            ```
        *   **`{% extends "имя_родительского_шаблона.html" %}`:** Указывает, что текущий шаблон наследует от родительского. Должен быть первым тегом в файле. Дочерний шаблон переопределяет блоки из родительского.
            ```django
            <!-- child.html -->
            {% extends "base.html" %}

            {% block title %}Моя страница{% endblock %}

            {% block content %}
              <h1>Содержимое моей страницы</h1>
            {% endblock %}
            ```
        *   **`{{ block.super }}`:** Используется внутри `{% block %}` в дочернем шаблоне для вставки оригинального содержимого этого блока из родительского шаблона.
            ```django
            {% block content %}
              {{ block.super }} <!-- Вставит контент из base.html -->
              <p>Дополнительный контент.</p>
            {% endblock %}
            ```
        *   **`{% include "имя_шаблона.html" %}`:** Включает содержимое другого шаблона в текущий. Удобно для переиспользуемых частей (шапка, подвал).
            ```django
            {% include "includes/header.html" %}
            
            <!-- Передача переменных во включаемый шаблон -->
            {% include "includes/user_card.html" with user=request.user profile=user_profile %}
            
            <!-- Изоляция контекста (переменные текущего шаблона не передаются) -->
            {% include "includes/footer.html" only %} 
            ```
    *   **`{% load ... %}`:** Загружает пользовательские теги или фильтры, либо встроенные библиотеки (например, `static`).
        ```django
        {% load static %}
        {% load custom_tags_library %} 
        ```
    *   **`{% static "путь/к/файлу" %}`:** Генерирует URL для статического файла (CSS, JS, изображения). Требует `{% load static %}`.
        ```django
        <link rel="stylesheet" href="{% static 'css/styles.css' %}">
        <img src="{% static 'images/logo.png' %}" alt="Логотип">
        ```
    *   **Создание пользовательских тегов:** Похоже на создание фильтров, но используются декораторы `@register.simple_tag` и `@register.inclusion_tag`.
        *   **`simple_tag`:** Принимает аргументы, обрабатывает их и возвращает строку (или записывает в контекст через `as`).
            ```python
            # myapp/templatetags/custom_tags.py
            # ... (register = template.Library()) ...
            @register.simple_tag(takes_context=True) # takes_context=True для доступа к контексту
            def show_greeting(context, user_name):
                request = context['request'] # Пример доступа к request
                return f"Hello, {user_name}! Welcome to {request.get_host()}"
            
            @register.simple_tag
            def get_latest_posts(count=5):
                # ... логика получения постов ...
                return Post.objects.order_by('-created_at')[:count]
            ```
            ```html
            {% load custom_tags %}
            {% show_greeting user.username %} 
            
            {% get_latest_posts 3 as latest_posts %}
            <ul>
              {% for post in latest_posts %}<li>{{ post.title }}</li>{% endfor %}
            </ul>
            ```
        *   **`inclusion_tag`:** Рендерит другой шаблон с переданным ему контекстом и вставляет результат.
            ```python
            # myapp/templatetags/custom_tags.py
            # ... (register = template.Library()) ...
            @register.inclusion_tag('myapp/includes/category_menu.html')
            def render_category_menu(active_category=None):
                categories = Category.objects.all()
                return {'categories': categories, 'active_category': active_category}
            ```
            ```html
            <!-- myapp/includes/category_menu.html -->
            <ul>
              {% for category in categories %}
                <li class{% if category == active_category %}="active"{% endif %}>
                  <a href="{{ category.get_absolute_url }}">{{ category.name }}</a>
                </li>
              {% endfor %}
            </ul>
            ```
            ```html
            <!-- Основной шаблон -->
            {% load custom_tags %}
            <nav>{% render_category_menu current_category %}</nav> 
            ```
*   **Статические файлы:**
    *   CSS, JavaScript, изображения, шрифты и т.д.
    *   **Хранение:**
        1.  В каталоге `static/` внутри каждого приложения (`DEBUG=True`).
        2.  В каталогах, указанных в `STATICFILES_DIRS` в `settings.py` (`DEBUG=True`).
        3.  В одном общем каталоге `STATIC_ROOT` (для `DEBUG=False`, продакшен). Команда `python manage.py collectstatic` собирает все статические файлы из приложений и `STATICFILES_DIRS` в `STATIC_ROOT`.
    *   **Настройка (`settings.py`):**
        *   `STATIC_URL`: URL-префикс для статических файлов (например, `/static/`).
        *   `STATICFILES_DIRS`: Список путей для поиска статики вне приложений.
        *   `STATIC_ROOT`: Путь к каталогу для `collectstatic`.
    *   **Использование в шаблонах:** Через тег `{% static %}` (требует `{% load static %}`).