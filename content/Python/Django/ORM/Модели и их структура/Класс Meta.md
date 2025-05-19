
*   **Класс `Meta` в моделях:**
    *   Вложенный класс для определения метаданных модели.
    *   **Опции:**
        *   `db_table`: Имя таблицы в БД (по умолчанию: `<app_label>_<model_name_lower>`). `db_table = 'my_custom_table'`
        *   `ordering`: Порядок сортировки по умолчанию для `QuerySet`. `ordering = ['-created_at', 'name']`
        *   `verbose_name`: Человекочитаемое имя модели в единственном числе. `verbose_name = 'Моя модель'`
        *   `verbose_name_plural`: Имя во множественном числе. `verbose_name_plural = 'Мои модели'`
        *   `unique_together`: Кортеж или список кортежей полей, комбинация которых должна быть уникальной. `unique_together = [('field1', 'field2')]` (Старый способ, лучше использовать `UniqueConstraint`).
        *   `indexes`: Список объектов `models.Index` для создания индексов в БД. `indexes = [models.Index(fields=['field1', '-field2'], name='my_index')]`
        *   `constraints`: Список ограничений БД (например, `models.UniqueConstraint`, `models.CheckConstraint`).
            ```python
            constraints = [
                models.UniqueConstraint(fields=['field1', 'field2'], name='unique_field1_field2'),
                models.CheckConstraint(check=models.Q(age__gte=18), name='age_gte_18')
            ]
            ```
        *   `abstract = True`: Делает модель абстрактной (не создает таблицу в БД, используется для наследования общих полей/методов).
        *   `proxy = True`: Делает модель прокси (использует таблицу родительской модели, но может иметь свои методы, менеджеры, `Meta` опции).
    *   **Пример `Meta`:**
        ```python
        # models.py
        from django.db import models

        class Article(models.Model):
            title = models.CharField(max_length=200)
            slug = models.SlugField(unique=True)
            published_date = models.DateTimeField(null=True, blank=True)
            # ...

            class Meta:
                db_table = 'news_articles'
                ordering = ['-published_date', 'title']
                verbose_name = 'Статья'
                verbose_name_plural = 'Статьи'
                indexes = [
                    models.Index(fields=['slug']),
                ]

            def __str__(self):
                return self.title
