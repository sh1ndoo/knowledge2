---
Описание: Стандартный модуль Python для записи логов (событий, ошибок, отладочной информации).
---
*   **Уровни логирования (по возрастанию важности):**
    1.  `DEBUG` (10): Детальная информация, интересная только при отладке.
    2.  `INFO` (20): Подтверждение, что всё работает как ожидается.
    3.  `WARNING` (30): Указание на неожиданное событие или потенциальную проблему в будущем (например, нехватка места). Программа продолжает работать. (Уровень по умолчанию).
    4.  `ERROR` (40): Серьезная проблема, из-за которой программа не смогла выполнить какую-то функцию.
    5.  `CRITICAL` (50): Очень серьезная ошибка, программа, возможно, не сможет продолжать работу.
*   **Базовая конфигурация (`logging.basicConfig`)**: Простой способ настроить логирование (вызывается один раз).
    ```python
    import logging

    logging.basicConfig(
        level=logging.DEBUG, # Минимальный уровень сообщений для обработки
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', # Формат сообщения
        # filename='app.log', # Запись в файл вместо консоли
        # filemode='w' # 'w' - перезапись, 'a' - дозапись (по умолчанию)
    )

    logging.debug('Это сообщение DEBUG')
    logging.info('Это сообщение INFO')
    logging.warning('Это сообщение WARNING') 
    ```
*   **Логгеры (`Logger`):** Объекты, через которые отправляются сообщения.
    *   Получение логгера: `logger = logging.getLogger(__name__)` (рекомендуется использовать `__name__` для иерархии).
    *   Корневой логгер: `logging.getLogger()` или просто `logging`.
    *   Методы для отправки сообщений: `logger.debug()`, `logger.info()`, `logger.warning()`, `logger.error()`, `logger.critical()`, `logger.exception()` (как `error`, но добавляет traceback).
*   **Наследование и Иерархия:**
    *   Логгеры образуют иерархию, основанную на именах, разделенных точками (e.g., `logging.getLogger('app.ui.button')`).
    *   Сообщения, отправленные дочерним логгером, по умолчанию передаются родительским логгерам (до корневого). `logger.propagate = False` отключает это.
    *   Уровень логгера (`logger.setLevel()`) определяет, сообщения какого уровня *этот* логгер будет обрабатывать (и передавать дальше).
*   **Обработчики (`Handler`):** Определяют, *куда* отправлять лог-сообщения.
    *   Логгер может иметь несколько обработчиков.
    *   Примеры: `logging.StreamHandler(stream=None)` (вывод в поток, по умолчанию `sys.stderr`), `logging.FileHandler(filename, mode='a', encoding=None, delay=False)`, `logging.handlers.RotatingFileHandler`, `logging.handlers.TimedRotatingFileHandler`.
    *   Добавление: `logger.addHandler(my_handler)`
    *   Удаление: `logger.removeHandler(my_handler)`
    *   Уровень обработчика (`handler.setLevel()`): Определяет минимальный уровень сообщений, которые *этот* обработчик будет выводить.
*   **Форматтеры (`Formatter`):** Определяют *формат* вывода лог-сообщений.
    *   Создание: `formatter = logging.Formatter(fmt=None, datefmt=None, style='%')`
        *   `fmt`: Строка формата сообщения.
        *   `datefmt`: Формат даты/времени для `%(asctime)s`.
        *   `style`: Стиль форматирования (`'%'`, `'{'`, `'$'`). `'%'` - по умолчанию.
    *   **Атрибуты формата (основные):** `%(asctime)s`, `%(created)f`, `%(filename)s`, `%(funcName)s`, `%(levelname)s`, `%(levelno)s`, `%(lineno)d`, `%(message)s`, `%(module)s`, `%(msecs)d`, `%(name)s`, `%(pathname)s`, `%(process)d`, `%(thread)d`, `%(threadName)s`.
    *   Применение к обработчику: `my_handler.setFormatter(formatter)`
    *   **Пример настройки с обработчиком и форматтером:**
        ```python
        import logging
        import sys

        # 1. Создать (или получить) логгер
        logger = logging.getLogger('my_app')
        logger.setLevel(logging.DEBUG) # Уровень логгера

        # 2. Создать обработчик(и)
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO) # Уровень обработчика

        file_handler = logging.FileHandler('detailed.log', mode='w', encoding='utf-8')
        file_handler.setLevel(logging.DEBUG)

        # 3. Создать форматтер(ы)
        # style='{' - позволяет использовать f-string-подобный формат
        console_format = logging.Formatter(
            fmt='{levelname: <8} - {name} - {message}', 
            style='{' 
        )
        file_format = logging.Formatter(
            fmt='{asctime} | {levelname: <8} | {name} | {filename}:{lineno} | {message}',
            datefmt='%Y-%m-%d %H:%M:%S',
            style='{'
        )

        # 4. Добавить форматтеры к обработчикам
        console_handler.setFormatter(console_format)
        file_handler.setFormatter(file_format)

        # 5. Добавить обработчики к логгеру
        # Избегаем дублирования, если скрипт запускается много раз (в Jupyter)
        if not logger.hasHandlers(): 
            logger.addHandler(console_handler)
            logger.addHandler(file_handler)

        # 6. Логирование
        logger.debug('Детальное сообщение для файла')
        logger.info('Информационное сообщение для консоли и файла')
        logger.warning('Предупреждение')
