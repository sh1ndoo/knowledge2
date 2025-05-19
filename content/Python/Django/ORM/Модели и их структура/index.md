---
title: Модели и их структура
---

*   [[Базовые определения и поля моделей|Базовые определения и поля моделей]]
    *   ORM (Object-Relational Mapping)
    *   Модель
    *   Поле модели
    *   Экземпляр модели
    *   Типы полей (`models.*`): `CharField`, `TextField`, `IntegerField`, `BooleanField`, `DateTimeField`, `DateField`, `TimeField`, `DecimalField`, `EmailField`, `FileField`, `ImageField`, `ForeignKey`, `ManyToManyField`, `OneToOneField`, `AutoField`, `SlugField`, `URLField`, `UUIDField`
    *   Аргументы полей: `max_length`, `null`, `blank`, `default`, `choices`, `verbose_name`, `unique`, `db_index`, `primary_key`, `editable`, `auto_now`, `auto_now_add`, `on_delete`, `related_name`
*   [[Класс Перечислений|Класс Перечислений]]
    *   Перечисления (`Enumeration classes`)
    *   `models.TextChoices`
    *   `models.IntegerChoices`
    *   Атрибуты перечисления: `values`, `labels`, `choices`, `names`
*   [[Класс Meta|Класс Meta]]
    *   Класс `Meta` в моделях
    *   Опции: `db_table`, `ordering`, `verbose_name`, `verbose_name_plural`, `unique_together`, `indexes`, `constraints`, `abstract`, `proxy`
*   [[Менеджеры моделей|Менеджеры моделей]]
    *   Менеджеры моделей
    *   Стандартный менеджер: `models.Manager()`
    *   Пользовательские менеджеры
*   [[Связи между моделями|Связи между моделями]]
    *   Многие к одному (`ForeignKey`)
    *   Многие ко многим (`ManyToManyField`)
    *   Один к одному (`OneToOneField`)
