**Поисковые выражения (Lookups):** Используются в `filter()`, `exclude()`, `get()`. Синтаксис: `field__lookup=value`.

- `exact`: Точное соответствие (чувствительно к регистру).
- `iexact`: Точное соответствие (без учета регистра).
- `contains`: Содержит подстроку (чувствительно к регистру).
- `icontains`: Содержит подстроку (без учета регистра).
- `in`: Значение поля находится в переданном списке/кортеже.
- `startswith`: Начинается с подстроки (чувствительно к регистру).
- `istartswith`: Начинается с подстроки (без учета регистра).
- `endswith`: Заканчивается подстрокой (чувствительно к регистру).
- `iendswith`: Заканчивается подстрокой (без учета регистра).
- `gt`: Больше (`>`).
- `gte`: Больше или равно (`>=`).
- `lt`: Меньше (`<`).
- `lte`: Меньше или равно (`<=`).
- `isnull`: Является ли значение `NULL` (`True` или `False`).
- `range`: Значение находится в диапазоне (принимает кортеж `(start, end)`).
- **Для дат/времени:** `date`, `time`, `year`, `month`, `day`, `week_day`.
- `regex`, `iregex`: Соответствие регулярному выражению.
- **Примеры:**
    
    ```python
    MyModel.objects.filter(name__iexact="john")
    MyModel.objects.filter(description__icontains="python")
    MyModel.objects.filter(status__in=['published', 'archived'])
    MyModel.objects.filter(age__gte=18)
    MyModel.objects.filter(pub_date__year=2023)
    MyModel.objects.filter(category__isnull=True)
    MyModel.objects.filter(price__range=(10.0, 50.0))
    ```