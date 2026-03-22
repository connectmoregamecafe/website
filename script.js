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

    let activeFilters = { players: null, category: null, complexity: null };

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

    gameSearch.addEventListener('input', applyFilters);

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
            const playerAttr = card.dataset.players; 

            const isMatchPlayers = checkPlayerMatch(playerAttr, activeFilters.players);
            const isMatchCategory = !activeFilters.category || category === activeFilters.category;
            const isMatchComplexity = !activeFilters.complexity || complexity === activeFilters.complexity;
            const isMatchSearch = title.includes(searchTerm);

            card.style.display = (isMatchPlayers && isMatchCategory && isMatchComplexity && isMatchSearch) 
                ? 'block' : 'none';
        });
    }

    /**
     * Advanced Player Matching
     * Handles: "2-4", "2+", "5", "2-10"
     */
    function checkPlayerMatch(gameValue, filterValue) {
        if (!filterValue) return true;
        if (!gameValue) return false;

        const filterNum = parseInt(filterValue);

        // Scenario 1: Range (e.g., "2-10")
        if (gameValue.includes('-')) {
            const parts = gameValue.split('-');
            const min = parseInt(parts[0]);
            const max = parseInt(parts[1]);
            return filterNum >= min && filterNum <= max;
        }

        // Scenario 2: Open-ended (e.g., "2+")
        if (gameValue.includes('+')) {
            const min = parseInt(gameValue.replace('+', ''));
            return filterNum >= min;
        }

        // Scenario 3: Exact Match (e.g., "4")
        return parseInt(gameValue) === filterNum;
    }
});
