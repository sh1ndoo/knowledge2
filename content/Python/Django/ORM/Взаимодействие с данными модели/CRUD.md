---
subtitle: 
tags: []
date created: 2025-04-19T14:34
date modified: 2025-05-21T00:20
---

   
   ### **Create (Создание):**
*   `save()`:
	```python
	obj = MyModel(field1='value1', field2='value2')
	obj.save() # Сохраняет новый объект в БД
	```
*   `create()`: Создает и сохраняет объект одним шагом.
	```python
	obj = MyModel.objects.create(field1='value1', field2='value2')
	```
*   `bulk_create()`: Эффективное создание множества объектов за один запрос (не вызывает `save()` для каждого объекта, не работает с ManyToMany до сохранения).
	```python
	MyModel.objects.bulk_create([
		MyModel(field1='value1', field2='value2'),
		MyModel(field1='value3', field2='value4'),
	])
	```
   ### **Read (Чтение):**
*   `all()`: Возвращает `QuerySet` всех объектов модели.
	```python
	all_objects = MyModel.objects.all()
	```
*   `filter(**kwargs)`: Возвращает `QuerySet` объектов, соответствующих условиям (AND).
	```python
	filtered_objects = MyModel.objects.filter(field1='value1', status='published')
	```
*   `exclude(**kwargs)`: Возвращает `QuerySet` объектов, *не* соответствующих условиям.
	```python
	excluded_objects = MyModel.objects.exclude(status='draft')
	```
*   `get(**kwargs)`: Возвращает **один** объект, соответствующий условиям. Вызывает ошибку `MyModel.DoesNotExist`, если объект не найден, или `MyModel.MultipleObjectsReturned`, если найдено больше одного.
	```python
	try:
		my_object = MyModel.objects.get(pk=1) # pk - primary key
	except MyModel.DoesNotExist:
		print("Объект не найден")
	```
*   `order_by(*fields)`: Сортирует `QuerySet`. `-` перед именем поля означает сортировку по убыванию.
	```python
	MyModel.objects.order_by('name') # По возрастанию имени
	MyModel.objects.order_by('-date_created') # По убыванию даты
	MyModel.objects.order_by('category', '-price') # Сначала по категории, потом по цене
	```
*   `get_object_or_404(klass, *args, **kwargs)`: Удобная функция (из `django.shortcuts`) для получения объекта или вызова `Http404`, если он не найден. Используется в представлениях.
	```python
	from django.shortcuts import get_object_or_404
	
	def my_view(request, pk):
		my_object = get_object_or_404(MyModel, pk=pk)
		# ... дальнейшая обработка ...
	```
	
	*   **Поисковые выражения (Lookups):** Используются в `filter()`, `exclude()`, `get()`. Синтаксис: `field__lookup=value`.
		*   `exact`: Точное соответствие (чувствительно к регистру).
		*   `iexact`: Точное соответствие (без учета регистра).
		*   `contains`: Содержит подстроку (чувствительно к регистру).
		*   `icontains`: Содержит подстроку (без учета регистра).
		*   `in`: Значение поля находится в переданном списке/кортеже.
		*   `startswith`: Начинается с подстроки (чувствительно к регистру).
		*   `istartswith`: Начинается с подстроки (без учета регистра).
		*   `endswith`: Заканчивается подстрокой (чувствительно к регистру).
		*   `iendswith`: Заканчивается подстрокой (без учета регистра).
		*   `gt`: Больше (`>`).
		*   `gte`: Больше или равно (`>=`).
		*   `lt`: Меньше (`<`).
		*   `lte`: Меньше или равно (`<=`).
		*   `isnull`: Является ли значение `NULL` (`True` или `False`).
		*   `range`: Значение находится в диапазоне (принимает кортеж `(start, end)`).
		*   **Для дат/времени:** `date`, `time`, `year`, `month`, `day`, `week_day`.
		*   `regex`, `iregex`: Соответствие регулярному выражению.
		*   **Примеры:**
			```python
			MyModel.objects.filter(name__iexact="john")
			MyModel.objects.filter(description__icontains="python")
			MyModel.objects.filter(status__in=['published', 'archived'])
			MyModel.objects.filter(age__gte=18)
			MyModel.objects.filter(pub_date__year=2023)
			MyModel.objects.filter(category__isnull=True)
			MyModel.objects.filter(price__range=(10.0, 50.0))
			```
   ### **Update (Обновление):**
*   `save()`: Изменить поля объекта и сохранить.
	```python
	my_object = MyModel.objects.get(pk=1)
	my_object.field1 = 'new_value'
	my_object.save() # Обновляет объект в БД
	```
*   `update(**kwargs)`: Обновляет поля для *всех* объектов в `QuerySet` одним SQL-запросом. **Не вызывает `save()`** для объектов, обходит сигналы.
	```python
	MyModel.objects.filter(status='draft').update(status='published', updated_at=timezone.now())
	```
*   `bulk_update(objs, fields)`: Эффективное обновление множества объектов (`objs` - список объектов) по указанным полям (`fields` - список имен полей). Требует, чтобы у объектов были `pk`.
	```python
	objects_to_update = list(MyModel.objects.filter(category='old'))
	for obj in objects_to_update:
		obj.category = 'new'
		obj.notes = 'Updated'
	MyModel.objects.bulk_update(objects_to_update, ['category', 'notes'])
	```
*   `update_or_create(defaults=None, **kwargs)`: Атомарно обновляет объект по `kwargs` или создает его, если он не найден. `defaults` - словарь полей, которые обновляются/устанавливаются при создании.
	```python
	obj, created = Person.objects.update_or_create(
		first_name="John", last_name="Lennon", # Поля для поиска
		defaults={'age': 40} # Поля для обновления/установки
	)
	if created:
		print("Создан новый объект John Lennon")
	else:
		print("Обновлен возраст John Lennon")
	```
   ### **Delete (Удаление):**
*   `delete()`: Удаляет объект или все объекты в `QuerySet`.
	```python
	# Удаление одного объекта
	my_object = MyModel.objects.get(pk=1)
	my_object.delete()

	# Удаление нескольких по фильтру
	MyModel.objects.filter(status='archived').delete()

	# Удаление всех (осторожно!)
	# MyModel.objects.all().delete() 
	```