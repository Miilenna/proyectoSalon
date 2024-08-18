document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (query.trim() === '') {
        resultsContainer.innerHTML = '<p>Пожалуйста введите критерий поиска.</p>';
        return;
    }

    fetch('../scripts/search_index.json')
        .then(response => response.json())
        .then(data => {
            let found = false;
            data.forEach(page => {
                const contentToSearch = page.content.toLowerCase() + ' ' + (page.hiddenContent ? page.hiddenContent.toLowerCase() : '');
                const titleToSearch = page.title.toLowerCase();

                if (contentToSearch.includes(query) || titleToSearch.includes(query)) {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `<a href="${page.url}">${page.title}</a><p>${page.content.substring(0, 100)}...</p>`;
                    resultsContainer.appendChild(resultItem);
                    found = true;
                }
            });

            if (!found) {
                resultsContainer.innerHTML = '<p>Ничего не найдено.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar el índice de búsqueda:', error);
            resultsContainer.innerHTML = '<p>Ошибка при поиске. Пожалуйста, повторите попытку позже.</p>';
        });
});