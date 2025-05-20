---
subtitle: 
tags: []
Описание: Функции для создания итераторов для эффективной работы с циклами.
date created: 2025-04-19T04:03
date modified: 2025-05-21T00:20
---

*   Бесконечные итераторы: `count(start=0, step=1)`, `cycle(iterable)`, `repeat(object[, times])`.
*   Комбинаторика: `product(*iterables, repeat=1)`, `permutations(iterable, r=None)`, `combinations(iterable, r)`, `combinations_with_replacement(iterable, r)`.
*   Фильтрация: `filterfalse(predicate, iterable)`, `dropwhile(predicate, iterable)`, `takewhile(predicate, iterable)`, `compress(data, selectors)`.
*   Объединение: `chain(*iterables)`, `chain.from_iterable(iterable)`.
*   Срезы: `islice(iterable, stop)`, `islice(iterable, start, stop[, step])`.
*   Объединение с выравниванием: `zip_longest(*iterables, fillvalue=None)`.
*   Разделение: `tee(iterable, n=2)` (создает `n` независимых итераторов).
*   Группировка: `groupby(iterable, key=None)`.
*   Накопление: `accumulate(iterable, func=operator.add)`.
*   Применение функции: `starmap(function, iterable)` (для итератора кортежей аргументов).

