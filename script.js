document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearBtn = document.getElementById('clearFilters');
    const gameCards = document.querySelectorAll('.game-card');

    function applyAllFilters() {
        const searchTerm = gameSearch.value.toLowerCase();
        
        // Collect active filters by group
        const activeFilters = {
            players: [],
            category: [],
            complexity: []
        };

        document.querySelectorAll('.filter-btn.active').forEach(btn => {
            const group = btn.parentElement.dataset.group;
            activeFilters[group].push(btn.dataset.filter);
        });

        gameCards.forEach(card => {
            const allVisibleText = card.innerText.toLowerCase();
            const cardPlayers = card.getAttribute('data-players');
            const cardCategory = card.getAttribute('data-category');
            const cardComplexity = card.getAttribute('data-complexity');

            // 1. Search Bar (Matches Title/Desc)
            const matchesSearch = allVisibleText.includes(searchTerm);

            // 2. Player Logic (Check if target number falls in card range)
            let matchesPlayers = activeFilters.players.length === 0;
            if (!matchesPlayers) {
                const range = cardPlayers.split('-').map(n => parseInt(n.trim()));
                const min = range[0];
                const max = range[1] || range[0];
                
                matchesPlayers = activeFilters.players.some(filter => {
                    if (filter === '5+') return max >= 5;
                    const num = parseInt(filter);
                    return num >= min && num <= max;
                });
            }

            // 3. Category Logic
            let matchesCategory = activeFilters.category.length === 0;
            if (!matchesCategory) {
                matchesCategory = activeFilters.category.some(f => cardCategory.includes(f));
            }

            // 4. Complexity Logic
            let matchesComplexity = activeFilters.complexity.length === 0;
            if (!matchesComplexity) {
                matchesComplexity = activeFilters.complexity.some(f => cardComplexity.includes(f));
            }

            // Final Visibility: Must pass ALL active categories (AND logic)
            if (matchesSearch && matchesPlayers && matchesCategory && matchesComplexity) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Toggle Button State
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            applyAllFilters();
        });
    });

    // Clear All Logic
    clearBtn.addEventListener('click', () => {
        gameSearch.value = "";
        filterBtns.forEach(btn => btn.classList.remove('active'));
        applyAllFilters();
    });

    if (gameSearch) gameSearch.addEventListener('input', applyAllFilters);

    // Accordion Logic
    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        header.addEventListener('click', () => {
            const wasActive = card.classList.contains('active');
            gameCards.forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });
});
