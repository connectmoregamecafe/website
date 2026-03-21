document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    let currentFilter = 'all';

    function applyAllFilters() {
        const searchTerm = gameSearch.value.toLowerCase();
        
        gameCards.forEach(card => {
            const allVisibleText = card.innerText.toLowerCase();
            const playersAttr = card.getAttribute('data-players'); // e.g., "2-4" or "2"
            const category = card.getAttribute('data-category').toLowerCase();
            const complexity = card.getAttribute('data-complexity').toLowerCase();
            
            // 1. Search Bar Logic
            const matchesSearch = allVisibleText.includes(searchTerm);
            
            // 2. Button Filter Logic
            let matchesButton = false;
            
            if (currentFilter === 'all') {
                matchesButton = true;
            } 
            // Handle Player Count Ranges (The "Smart" Part)
            else if (currentFilter.includes('Players')) {
                const targetNum = parseInt(currentFilter); // Gets 2, 3, 4, or 5
                
                // Split "2-10" into [2, 10] or "2" into [2, 2]
                const range = playersAttr.split('-').map(num => parseInt(num.trim()));
                const min = range[0];
                const max = range[1] || range[0]; // If it's just "2", max is also 2

                if (currentFilter === '5+ Players') {
                    if (max >= 5) matchesButton = true;
                } else {
                    if (targetNum >= min && targetNum <= max) matchesButton = true;
                }
            } 
            // Handle Category/Difficulty
            else {
                const filterLower = currentFilter.toLowerCase();
                if (category.includes(filterLower) || complexity.includes(filterLower)) {
                    matchesButton = true;
                }
            }

            card.style.display = (matchesSearch && matchesButton) ? "block" : "none";
        });
    }

    // Event Listeners
    if (gameSearch) gameSearch.addEventListener('input', applyAllFilters);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyAllFilters();
        });
    });

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
