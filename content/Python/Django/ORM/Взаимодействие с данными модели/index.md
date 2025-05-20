---
subtitle: 
tags: []
title: Взаимодействие с данными модели
date created: 2025-04-21T00:25
date modified: 2025-05-21T00:20
---

- [[Агрегирующие функции. Метод values()|Агрегирующие функции. Метод values()]]
- [[Методы извлечения или проверки данных|Методы извлечения или проверки данных]]
- [[Проблема N + 1 (Ленивая и жадная загрузка)|Проблема N + 1 (Ленивая и жадная загрузка)]]
    - Ленивая загрузка (Lazy Loading)
    - Проблема N + 1
    - Жадная загрузка (Eager Loading)
    - Использование `select_related()`
    - Использование `prefetch_related()`
- [[CRUD|CRUD]]
    - Create (Создание): `save()`, `create()`, `bulk_create()`
    - Read (Чтение): `all()`, `filter()`, `exclude()`, `get()`, `order_by()`, `get_object_or_404()`, Поисковые выражения (Lookups)
    - Update (Обновление): `save()`, `update()`, `bulk_update()`, `update_or_create()`
    - Delete (Удаление): `delete()`
- [[F() expressions, Value class, annotate|F() expressions, Value class, annotate]]
    - F() expressions: Описание, Преимущества, Использование в фильтрации, Дополнительные способы
    - Value class: Описание, Синтаксис
    - Annotate: Описание, Аннотации и фильтрация, Порядок `annotate()` и `filter()`
- [[Lookups|Lookups]]
    - Описание (Использование в `filter()`, `exclude()`, `get()`)
    - Список доступных Lookups (exact, iexact, contains, in, gt, gte, isnull, range и др.)
    - Lookups для дат/времени
    - Примеры использования
- [[Q() objects|Q() objects]]
    - Описание (Использование для OR, NOT, XOR)
    - Синтаксис (`Q()`, `~Q()`)
    - Объединение Q объектов (`&`, `|`, `^`)
    - Использование с обычными lookups
    - Приоритет операторов

