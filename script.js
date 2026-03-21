document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const gameSearch = document.getElementById('gameSearch');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const gameCards = document.querySelectorAll('.game-card');

    // 2. RUN LIBRARY LOGIC ONLY IF CARDS EXIST
    if (gameCards.length > 0) {
        
        // Expansion Toggle
        gameCards.forEach(card => {
            const header = card.querySelector('.game-header');
            if (header) {
                header.addEventListener('click', () => {
                    card.classList.toggle('active');
                });
            }
        });

        // Filter Function
        const filterLibrary = () => {
            const query = gameSearch ? gameSearch.value.toLowerCase() : "";
            
            gameCards.forEach(card => {
                const name = card.querySelector('h2').innerText.toLowerCase();
                const matchesSearch = name.includes(query);
                
                // Add any additional complex filter logic here later
                card.style.display = matchesSearch ? "block" : "none";
            });
        };

        // Event Listeners for Filters
        if (gameSearch) gameSearch.addEventListener('input', filterLibrary);
        checkboxes.forEach(box => box.addEventListener('change', filterLibrary));
    }
});
