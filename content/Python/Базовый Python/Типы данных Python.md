   ### **Числа (`Numbers`)**
*   `int`: Целые числа произвольной точности.
*   `float`: Числа с плавающей точкой (двойная точность).
*   `complex`: Комплексные числа (`a + bj`).
*   `bool`: Логический тип (`True`, `False`).
   ### **Строки (`String`)** - `""` или `''`
*   Неизменяемая упорядоченная последовательность символов Unicode.
*   Итерируемая.
*   **Основные операции и методы:**
	*   Срез: `S[i:j:step]`
	*   Длина: `len(S)`
	*   Поиск подстроки:
		*   `S.find(str, [start], [end])`: Возвращает индекс первого вхождения или `-1`.
		*   `S.rfind(str, [start], [end])`: Возвращает индекс последнего вхождения или `-1`.
		*   `S.index(str, [start], [end])`: Как `find`, но вызывает `ValueError`, если не найдено.
		*   `S.rindex(str, [start], [end])`: Как `rfind`, но вызывает `ValueError`, если не найдено.
	*   Замена: `S.replace(old, new, [count])`
	*   Разбиение: `S.split([sep], [maxsplit])`: Возвращает список строк.
	*   Проверки (`True`/`False`): `S.isdigit()`, `S.isalpha()`, `S.isalnum()`, `S.islower()`, `S.isupper()`, `S.isspace()`, `S.istitle()`, `S.startswith(prefix)`, `S.endswith(suffix)`.
	*   Изменение регистра: `S.upper()`, `S.lower()`, `S.capitalize()`, `S.title()`, `S.swapcase()`.
	*   Объединение: `separator.join(iterable)`: Сборка строки из элементов `iterable` с разделителем `separator`.
	*   Удаление пробелов: `S.lstrip([chars])`, `S.rstrip([chars])`, `S.strip([chars])`.
	*   Выравнивание: `S.center(width, [fill])`, `S.ljust(width, [fill])`, `S.rjust(width, [fill])`, `S.zfill(width)`.
	*   Разделение: `S.partition(sep)`, `S.rpartition(sep)`: Возвращает кортеж `(до_sep, sep, после_sep)`.
	*   Подсчет: `S.count(sub, [start], [end])`.
	*   Табуляция: `S.expandtabs([tabsize])`.
	*   Преобразование символ <-> код: `ord(char)`, `chr(code)`.
   ### **Кортежи (`Tuple`)** - `()`
*   Неизменяемая упорядоченная последовательность.
*   Итерируемый.
*   **Методы:**
	*   `tuple.index(value, [start], [stop])`: Индекс первого вхождения `value`.
	*   `tuple.count(value)`: Количество вхождений `value`.
   ### **Списки (`List`)** - `[]`
*   Изменяемая упорядоченная последовательность.
*   Итерируемый.
*   **Методы:**
	*   `list.append(obj)`: Добавить `obj` в конец.
	*   `list.extend(iterable)`: Расширить список элементами из `iterable`.
	*   `list.insert(index, obj)`: Вставить `obj` перед позицией `index`.
	*   `list.remove(value)`: Удалить первое вхождение `value`.
	*   `list.pop([index])`: Удалить и вернуть элемент по индексу (по умолчанию - последний).
	*   `list.clear()`: Удалить все элементы.
	*   `list.index(value, [start], [stop])`: Индекс первого вхождения `value`.
	*   `list.count(value)`: Количество вхождений `value`.
	*   `list.sort(key=None, reverse=False)`: Сортировать список на месте.
	*   `list.reverse()`: Развернуть список на месте.
	*   `list.copy()`: Создать поверхностную копию списка.
   **Множества (`Set`)** - `{}` (но пустой: `set()`)
    *   Изменяемая, неупорядоченная (до Python 3.7) коллекция *уникальных* хешируемых элементов.
    *   **Операции (не меняют множество, возвращают новое):**
        *   `set.isdisjoint(other)`: `True`, если нет общих элементов.
        *   `set.issubset(other)` или `set <= other`: `True`, если все элементы `set` есть в `other`.
        *   `set.issuperset(other)` или `set >= other`: `True`, если все элементы `other` есть в `set`.
        *   `set.union(other, ...)` или `set | other | ...`: Объединение.
        *   `set.intersection(other, ...)` или `set & other & ...`: Пересечение.
        *   `set.difference(other, ...)` или `set - other`: Разность (элементы `set`, которых нет в `other`).
        *   `set.symmetric_difference(other)` или `set ^ other`: Симметрическая разность (элементы, которые есть только в одном из множеств).
        *   `set.copy()`: Поверхностная копия.
    *   **Методы (меняют множество на месте):**
        *   `set.update(other, ...)` или `set |= other | ...`: Добавить элементы из `other`.
        *   `set.intersection_update(other, ...)` или `set &= other & ...`: Оставить только общие элементы с `other`.
        *   `set.difference_update(other, ...)` или `set -= other`: Удалить элементы, которые есть в `other`.
        *   `set.symmetric_difference_update(other)` или `set ^= other`: Оставить элементы, которые есть только в одном из множеств.
        *   `set.add(elem)`: Добавить элемент.
        *   `set.remove(elem)`: Удалить элемент (вызывает `KeyError`, если его нет).
        *   `set.discard(elem)`: Удалить элемент, если он есть (не вызывает ошибку).
        *   `set.pop()`: Удалить и вернуть произвольный элемент (вызывает `KeyError`, если пусто).
        *   `set.clear()`: Очистить множество.
   ### **Словари (`Dict`)** - `{}`
*   Изменяемая, упорядоченная (с Python 3.7) коллекция пар `ключ: значение`.
*   Ключи должны быть уникальными и хешируемыми (неизменяемыми).
*   Обращение к значению по ключу: `dict[key]` (вызывает `KeyError`, если ключа нет).
*   **Методы:**
	*   `dict.clear()`: Очистить словарь.
	*   `dict.copy()`: Поверхностная копия.
	*   `dict.fromkeys(seq, [value])`: Создать словарь с ключами из `seq` и значением `value` (по умолчанию `None`).
	*   `dict.get(key, [default])`: Вернуть значение по ключу `key`, или `default` (по умолчанию `None`), если ключа нет.
	*   `dict.items()`: Возвращает представление (view) пар `(ключ, значение)`.
	*   `dict.keys()`: Возвращает представление ключей.
	*   `dict.values()`: Возвращает представление значений.
	*   `dict.pop(key, [default])`: Удалить ключ `key` и вернуть его значение. Если ключа нет, вернуть `default` или вызвать `KeyError`.
	*   `dict.popitem()`: Удалить и вернуть последнюю добавленную пару `(ключ, значение)` (до Python 3.7 - произвольную). Вызывает `KeyError`, если пусто.
	*   `dict.setdefault(key, [default])`: Вернуть значение по ключу `key`. Если ключа нет, вставить `key` со значением `default` (по умолчанию `None`) и вернуть `default`.
	*   `dict.update([other])`: Обновить словарь парами из `other` (другого словаря или итератора пар). Существующие ключи перезаписываются.
