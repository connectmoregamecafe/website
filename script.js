document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const gameCards = document.querySelectorAll('.game-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearBtn = document.getElementById('clearFilters');

    // Accordion Logic (Open/Close game descriptions)
    gameCards.forEach(card => {
        card.querySelector('.game-header').addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // Search and Filter Function
    function filterGames() {
        const searchTerm = gameSearch.value.toLowerCase();
        const activeFilters = {
            players: document.querySelector('[data-group="players"] .active')?.dataset.filter,
            category: document.querySelector('[data-group="category"] .active')?.dataset.filter,
            complexity: document.querySelector('[data-group="complexity"] .active')?.dataset.filter
        };

        gameCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const category = card.dataset.category;
            const players = card.dataset.players;
            const complexity = card.dataset.complexity;

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = !activeFilters.category || category === activeFilters.category;
            const matchesPlayers = !activeFilters.players || players === activeFilters.players;
            const matchesComplexity = !activeFilters.complexity || complexity === activeFilters.complexity;

            if (matchesSearch && matchesCategory && matchesPlayers && matchesComplexity) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter Button Click Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            const wasActive = btn.classList.contains('active');
            
            // Remove active from others in group
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            // Toggle current
            if (!wasActive) btn.classList.add('active');
            
            filterGames();
        });
    });

    // Clear All
    clearBtn?.addEventListener('click', () => {
        gameSearch.value = '';
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterGames();
    });

    // Search Input Logic
    gameSearch.addEventListener('input', filterGames);
});
