---
subtitle: 
tags: []
Описание: Стандартная библиотека Python для создания графического пользовательского интерфейса (GUI).
date created: 2025-04-19T04:10
date modified: 2025-05-21T00:20
---

*   Основное окно: `root = tkinter.Tk()`
*   Запуск цикла обработки событий: `root.mainloop()`
*   Заголовок окна: `root.title("My Application")`
*   Размер окна: `root.geometry('400x250')`
*   **Основные виджеты (классы):**
	*   `Tk`: Главное окно приложения.
	*   `Label`: Отображение текста или изображения.
		*   Синтаксис: `lbl = tkinter.Label(parent, text="Привет", font=("Arial Bold", 50), bg="white", fg="black")`
		*   Размещение: `lbl.grid(column=0, row=0)` (или `.pack()`, `.place()`).
	*   `Button`: Кнопка.
		*   Синтаксис: `btn = tkinter.Button(parent, text="Нажми меня!", command=my_function)`
		*   Размещение: `btn.grid(column=1, row=0)`
		*   Свойство `command`: Принимает ссылку на функцию, которая будет вызвана при нажатии.
*   **Общие свойства виджетов:**
	*   `bg`: Цвет фона.
	*   `fg`: Цвет переднего плана (текста).
	*   `font`: Шрифт.
	*   `width`, `height`: Размеры.
	*   ... и многие другие.

