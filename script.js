document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const gameCards = document.querySelectorAll('.game-card');

    if (gameCards.length > 0) {
        gameCards.forEach(card => {
            const header = card.querySelector('.game-header');
            if (header) {
                header.addEventListener('click', () => {
                    gameCards.forEach(c => {
                        if (c !== card) c.classList.remove('active');
                    });
                    card.classList.toggle('active');
                });
            }
        });

        if (gameSearch) {
            gameSearch.addEventListener('input', () => {
                const query = gameSearch.value.toLowerCase();
                gameCards.forEach(card => {
                    const name = card.querySelector('h2').innerText.toLowerCase();
                    const category = card.getAttribute('data-category').toLowerCase();
                    const players = card.getAttribute('data-players').toLowerCase();

                    if (name.includes(query) || category.includes(query) || players.includes(query)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        }
    }
});
