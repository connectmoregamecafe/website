document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const gameGrid = document.getElementById('gameGrid');
    const gameCards = Array.from(document.querySelectorAll('.game-card'));
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearBtn = document.getElementById('clearFilters');

    // Accordion Logic
    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            gameCards.forEach(c => c.classList.remove('active'));
            if (!isActive) card.classList.add('active');
        });
    });

    // Filter State
    let activeFilters = {
        players: null,
        category: null,
        complexity: null
    };

    // Filter Click Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement.dataset.group;
            const value = btn.dataset.filter;

            if (activeFilters[group] === value) {
                activeFilters[group] = null;
                btn.classList.remove('active');
            } else {
                btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                activeFilters[group] = value;
                btn.classList.add('active');
            }
            applyFilters();
        });
    });

    // Search Input Logic
    gameSearch.addEventListener('input', applyFilters);

    // Clear Filters
    clearBtn.addEventListener('click', () => {
        activeFilters = { players: null, category: null, complexity: null };
        filterButtons.forEach(btn => btn.classList.remove('active'));
        gameSearch.value = '';
        applyFilters();
    });

    function applyFilters() {
        const searchTerm = gameSearch.value.toLowerCase();

        gameCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const category = card.dataset.category;
            const complexity = card.dataset.complexity;
            
            // Player Logic: Handles ranges like "2-4" or "5+"
            const playerAttr = card.dataset.players; // e.g., "4" or "5+"
            const isMatchPlayers = checkPlayerMatch(playerAttr, activeFilters.players);
            
            const isMatchCategory = !activeFilters.category || category === activeFilters.category;
            const isMatchComplexity = !activeFilters.complexity || complexity === activeFilters.complexity;
            const isMatchSearch = title.includes(searchTerm);

            if (isMatchPlayers && isMatchCategory && isMatchComplexity && isMatchSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Helper to determine if a game fits the selected player count
     * @param {string} gameValue - The data-players attribute (e.g., "4", "5+")
     * @param {string} filterValue - The active filter (e.g., "3", "5+")
     */
    function checkPlayerMatch(gameValue, filterValue) {
        if (!filterValue) return true;

        // If filter is "5+", check if game allows 5 or more
        if (filterValue === "5+") {
            return gameValue === "5+";
        }

        const filterNum = parseInt(filterValue);

        // If game is "5+", it inherently supports 5, 6, 7+ 
        // (Adjust this logic if 5+ games should show up when '4' is clicked)
        if (gameValue === "5+") {
            return filterNum >= 5;
        }

        // Check if the filtered number is less than or equal to the game's max capacity
        // Note: We assume games labeled "4" generally support 2-4 players.
        const gameMax = parseInt(gameValue);
        return filterNum <= gameMax;
    }
});
