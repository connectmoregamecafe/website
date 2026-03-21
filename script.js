document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    let currentFilter = 'all';

    function applyAllFilters() {
        const searchTerm = gameSearch.value.toLowerCase();
        gameCards.forEach(card => {
            const title = card.querySelector('h2').innerText.toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            const players = card.getAttribute('data-players').toLowerCase();
            const complexity = card.getAttribute('data-complexity').toLowerCase();
            
            const pool = `${title} ${category} ${players} ${complexity}`;
            const matchesSearch = pool.includes(searchTerm);
            
            const matchesButton = (currentFilter === 'all' || 
                                   category.includes(currentFilter.toLowerCase()) || 
                                   players.includes(currentFilter.toLowerCase()) || 
                                   complexity.includes(currentFilter.toLowerCase()));

            card.style.display = (matchesSearch && matchesButton) ? "block" : "none";
        });
    }

    if (gameSearch) gameSearch.addEventListener('input', applyAllFilters);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyAllFilters();
        });
    });

    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        header.addEventListener('click', () => {
            const wasActive = card.classList.contains('active');
            gameCards.forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });
});
