document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const repoList = document.getElementById('repo-list');
    const errorMessage = document.createElement('p');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Evita il refresh della pagina

        const query = document.getElementById('searchInput').value.trim();  // Ottieni il valore dell'input di ricerca
        const searchType = document.getElementById('searchType').value;  // Ottieni il tipo di ricerca

        if (!query) {
            repoList.innerHTML = '';
            errorMessage.textContent = 'Il campo di ricerca è vuoto. Inserisci un termine di ricerca.';
            errorMessage.classList.add('text-danger');
            repoList.appendChild(errorMessage);
            return;
        }
        if (query.length < 3) {
            repoList.innerHTML = '';
            errorMessage.textContent = 'Il campo di ricerca deve contenere almeno 3 caratteri.';
            errorMessage.classList.add('text-danger');
            repoList.appendChild(errorMessage);
            return;
        }

        let url;
        if (searchType === 'repositories') {
            url = `https://api.github.com/search/repositories?q=${query}`;
        } else {
            url = `https://api.github.com/search/users?q=${query}`;
        }

        axios.get(url)
            .then(response => {
                let items = response.data.items;
                repoList.innerHTML = '';

                if (items.length === 0) {
                    errorMessage.textContent = 'Nessun risultato trovato per la tua ricerca.';
                    errorMessage.classList.add('text-warning');
                    repoList.appendChild(errorMessage);
                    return;
                }

                items.forEach(item => {
                    const colDiv = document.createElement('div');
                    colDiv.classList.add('col-md-4', 'mb-4');

                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card', 'shadow-sm');  // Aggiungi una leggera ombra

                    const cardBodyDiv = document.createElement('div');
                    cardBodyDiv.classList.add('card-body');

                    if (searchType === 'repositories') {
                        const cardTitle = document.createElement('h5');
                        cardTitle.classList.add('card-title');
                        cardTitle.textContent = item.full_name;

                        const cardText = document.createElement('p');
                        cardText.classList.add('card-text');
                        cardText.textContent = item.description || "No description available.";

                        const cardLink = document.createElement('a');
                        cardLink.classList.add('btn', 'btn-primary');
                        cardLink.href = item.html_url;
                        cardLink.target = "_blank";
                        cardLink.textContent = 'View Repository';

                        cardBodyDiv.appendChild(cardTitle);
                        cardBodyDiv.appendChild(cardText);
                        cardBodyDiv.appendChild(cardLink);
                    } else {
                        const cardTitle = document.createElement('h5');
                        cardTitle.classList.add('card-title');
                        cardTitle.textContent = item.login;

                        const cardLink = document.createElement('a');
                        cardLink.classList.add('btn', 'btn-secondary');
                        cardLink.href = `https://github.com/${item.login}`;
                        cardLink.target = "_blank";
                        cardLink.textContent = 'View User/Org';

                        cardBodyDiv.appendChild(cardTitle);
                        cardBodyDiv.appendChild(cardLink);
                    }

                    cardDiv.appendChild(cardBodyDiv);
                    colDiv.appendChild(cardDiv);
                    repoList.appendChild(colDiv);
                });
            })
            .catch(error => {
                console.error('Errore nella richiesta:', error);
                repoList.innerHTML = '';
                errorMessage.textContent = 'Errore nel caricamento dei risultati. Verifica la connessione o riprova.';
                errorMessage.classList.add('text-danger');
                repoList.appendChild(errorMessage);
            });
    });
});
