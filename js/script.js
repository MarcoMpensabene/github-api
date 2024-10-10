

const url = 'https://api.github.com/repositories';  // Endpoint per tutte le repo pubbliche

// Funzione per ottenere le repository pubbliche e mostrarle
axios.get(url)
    .then(response => {
        const repos = response.data;
        const repoList = document.getElementById('repo-list');

        // Itera attraverso le repository e le aggiunge alla lista
        repos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.textContent = `${repo.full_name} - ${repo.html_url}`;  // Nome e URL della repository
            repoList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
        document.getElementById('repo-list').innerHTML = '<li>Errore nel caricamento delle repository.</li>';
    });