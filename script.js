document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    let currentFilter = 'all';

    function applyAllFilters() {
        const searchTerm = gameSearch.value.toLowerCase();
        
        gameCards.forEach(card => {
            // Get everything: Titles, Badge text, Descriptions
            const allVisibleText = card.innerText.toLowerCase();
            
            // Get metadata tags
            const category = card.getAttribute('data-category').toLowerCase();
            const players = card.getAttribute('data-players').toLowerCase();
            const complexity = card.getAttribute('data-complexity').toLowerCase();
            
            // Search Bar Logic: Does it match ANYTHING visible?
            const matchesSearch = allVisibleText.includes(searchTerm);
            
            // Button Filter Logic
            let matchesButton = false;
            if (currentFilter === 'all') {
                matchesButton = true;
            } else if (currentFilter === '5+ Players') {
                // Logic for the "5+ Players" button
                const playerRange = players.match(/\d+/g);
                if (playerRange && Math.max(...playerRange) >= 5) matchesButton = true;
            } else {
                // Check if button text matches Category, Player string, or Complexity tag
                const filterLower = currentFilter.toLowerCase();
                if (category.includes(filterLower) || 
                    players.includes(filterLower) || 
                    complexity.includes(filterLower) ||
                    allVisibleText.includes(filterLower)) { // Extra check for badge text
                    matchesButton = true;
                }
            }

            // Show if both search AND button filters match
            card.style.display = (matchesSearch && matchesButton) ? "block" : "none";
        });
    }

    if (gameSearch) {
        gameSearch.addEventListener('input', applyAllFilters);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyAllFilters();
        });
    });

    // Accordion interaction
    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        header.addEventListener('click', () => {
            const wasActive = card.classList.contains('active');
            gameCards.forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });
});
