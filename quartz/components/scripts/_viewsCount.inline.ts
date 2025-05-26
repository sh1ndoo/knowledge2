async function fetchAndDisplayGoatCounterTotalViews(
    elementId: string,
    goatCounterBaseUrl: string = 'https://ifknow.goatcounter.com'
): Promise<void> {
    const currentPagePath = location.pathname;
    const encodedPath = encodeURIComponent(currentPagePath);
    const jsonApiUrl = `${goatCounterBaseUrl}/counter/${encodedPath}.json`;
    try {
        const response = await fetch(jsonApiUrl);

        // Проверяем, что запрос был успешным (статус 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch GoatCounter data: ${response.status} ${response.statusText}`);
        }

        // Определяем тип данных, которые мы ожидаем получить из JSON
        interface GoatCounterTotalData {
            count: string; // "1,234"
            count_unique: string;
        }

        const data: GoatCounterTotalData = await response.json();

        // Находим HTML-элемент по его ID
        const targetElement = document.getElementById(elementId);

        if (targetElement) {
            // Вставляем полученное число просмотров в элемент
            targetElement.innerText = data.count;
        } else {
            console.warn(`Element with ID '${elementId}' not found. Cannot display GoatCounter total views.`);
        }
    } catch (error: unknown) {
        // Логируем ошибку, если что-то пошло не так
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Error fetching or displaying GoatCounter total views:', errorMessage);
        // Можно опционально показать placeholder или сообщение об ошибке пользователю:
        // const targetElement = document.getElementById(elementId);
        // if (targetElement) {
        //     targetElement.innerText = 'N/A'; // Например, "Недоступно"
        // }
    }
}

// Вызываем функцию после того, как DOM полностью загрузится
// (это важно, чтобы убедиться, что targetElement уже существует на странице)
document.addEventListener("nav", async (e: unknown) => {
    fetchAndDisplayGoatCounterTotalViews('site-total-visits');
});
