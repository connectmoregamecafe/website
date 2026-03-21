document.addEventListener('DOMContentLoaded', () => {
    const gameSearch = document.getElementById('gameSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    let currentCategory = 'all';

    // Core Filtering Function
    function applyFilters() {
        const searchTerm = gameSearch.value.toLowerCase();

        gameCards.forEach(card => {
            const title = card.querySelector('h2').innerText.toLowerCase();
            const categoryData = card.getAttribute('data-category'); // e.g., "Strategy"
            const players = card.getAttribute('data-players').toLowerCase();
            
            // Search logic (Checks title, category, or player count)
            const matchesSearch = title.includes(searchTerm) || 
                                  categoryData.toLowerCase().includes(searchTerm) || 
                                  players.includes(searchTerm);
            
            // Button logic
            const matchesCategory = (currentCategory === 'all' || categoryData.includes(currentCategory));

            if (matchesSearch && matchesCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Event Listener for Search Typing
    if (gameSearch) {
        gameSearch.addEventListener('input', applyFilters);
    }

    // Event Listener for Category Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button UI
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set category and filter
            currentCategory = btn.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Event Listener for Accordion Dropdowns
    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        header.addEventListener('click', () => {
            const wasActive = card.classList.contains('active');
            
            // Close all open cards
            gameCards.forEach(c => c.classList.remove('active'));
            
            // If the clicked card wasn't already open, open it
            if (!wasActive) {
                card.classList.add('active');
            }
        });
    });
});
