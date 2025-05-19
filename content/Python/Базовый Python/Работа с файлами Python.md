*   **Функция `open()`:**
    *   `open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)`
    *   Возвращает файловый объект (поток).
    *   `file`: Путь к файлу (строка).
    *   `mode`: Режим доступа (строка):
        *   `'r'`: Чтение (по умолчанию). Ошибка, если файла нет.
        *   `'w'`: Запись. Создает файл, если его нет; **перезаписывает (очищает)**, если есть.
        *   `'a'`: Дозапись. Создает файл, если его нет; добавляет данные в конец, если есть.
        *   `'x'`: Эксклюзивное создание. Ошибка, если файл существует.
        *   `'b'`: Бинарный режим (для нетекстовых файлов, например, изображений). Добавляется к основному режиму: `'rb'`, `'wb'`, `'ab'`.
        *   `'t'`: Текстовый режим (по умолчанию).
        *   `'+'`: Обновление (чтение и запись). Добавляется к основному режиму: `'r+'`, `'w+'`, `'a+'`.
    *   `encoding`: Кодировка для текстового режима (важно указывать, часто `'utf-8'`).
    *   Пример: `my_file = open('my_text.txt', mode='r', encoding='utf-8')`
*   **Методы файлового объекта:**
    *   `.read([size])`: Читает `size` байт/символов или весь файл, если `size` не указан. Перемещает курсор.
        ```python
        content = my_file.read() # Весь файл
        first_chars = my_file.read(10) # Первые 10 символов
        ```
    *   `.readline()`: Читает одну строку до символа `\n` (включая его). Перемещает курсор. Возвращает пустую строку в конце файла.
        ```python
        line1 = my_file.readline()
        line2 = my_file.readline()
        # Убрать символ переноса строки:
        clean_line = my_file.readline().strip() 
        ```
    *   `.readlines()`: Читает все оставшиеся строки и возвращает их в виде списка строк (включая `\n`). Может потреблять много памяти для больших файлов.
        ```python
        all_lines = my_file.readlines() 
        ```
    *   `.write(s)`: Записывает строку `s` в файл (в режимах `'w'`, `'a'`, `'+'`). Возвращает количество записанных символов.
        ```python
        file_to_write = open('output.txt', mode='w', encoding='utf-8')
        count = file_to_write.write("Hello, world!\n")
        print(count) 
        ```
    *   `.writelines(lines)`: Записывает список строк `lines` в файл (не добавляет разделители строк автоматически).
    *   `.close()`: Закрывает файл, освобождая ресурсы. **Важно вызывать всегда** (если не используется `with`).
        ```python
        my_file.close()
        ```
    *   `.seek(offset, [whence])`: Перемещает курсор файла на позицию `offset`. `whence` (0 - от начала, 1 - от текущей, 2 - от конца) используется в бинарном режиме. Для текстовых файлов обычно используется только `seek(0)` (переход в начало).
        ```python
        my_file.seek(0) # Перейти в начало файла
        ```
    *   `.tell()`: Возвращает текущую позицию курсора (в байтах).
*   **Контекстный менеджер `with` (Рекомендуемый способ):**
    *   Гарантирует автоматическое закрытие файла (`.close()`) после завершения блока `with`, даже если внутри произошла ошибка.
    *   Синтаксис:
        ```python
        try:
            with open('my_file.txt', mode='r', encoding='utf-8') as f:
                content = f.read()
                # Работа с content
            # Файл f здесь уже автоматически закрыт
        except FileNotFoundError:
            print("Файл не найден.")

        with open('output.txt', 'w', encoding='utf-8') as outfile:
            outfile.write("Эта строка будет записана.\n")
        # Файл outfile здесь уже автоматически закрыт
        ```
*   **JSON (`JavaScript Object Notation`)**:
    *   Текстовый формат обмена данными.
    *   Модуль `json` в Python для работы с ним.
    *   **Основные функции:**
        *   `json.dump(obj, fp, indent=None, ...)`: Записать Python-объект `obj` в файловый объект `fp` в формате JSON. `indent` для красивого вывода.
        *   `json.dumps(obj, indent=None, ...)`: Преобразовать Python-объект `obj` в строку JSON.
        *   `json.load(fp)`: Прочитать JSON из файлового объекта `fp` и преобразовать в Python-объект (обычно `dict` или `list`).
        *   `json.loads(s)`: Преобразовать строку JSON `s` в Python-объект.
    ```python
    import json

    data = {'name': 'Alice', 'age': 30, 'city': 'New York'}

    # Запись в файл
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    # Чтение из файла
    with open('data.json', 'r', encoding='utf-8') as f:
        loaded_data = json.load(f)
        print(loaded_data['city']) # Вывод: New York
    ```
