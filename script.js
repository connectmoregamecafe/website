document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ALL NECESSARY ELEMENTS
    const gameSearch = document.getElementById('gameSearch');
    const clearBtn = document.getElementById('clearFiltersBtn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const gameCards = document.querySelectorAll('.game-card');

    // 2. SEARCH & FILTER LOGIC
    function filterLibrary() {
        const query = gameSearch.value.toLowerCase();
        
        // Get checked values for each group
        const selectedVibes = Array.from(document.querySelectorAll('.category-check:checked')).map(cb => cb.value);
        const selectedPlayers = Array.from(document.querySelectorAll('.player-check:checked')).map(cb => cb.value);
        const selectedComplexity = Array.from(document.querySelectorAll('.complexity-check:checked')).map(cb => cb.value);

        gameCards.forEach(card => {
            const name = card.querySelector('h2').innerText.toLowerCase();
            const category = card.getAttribute('data-category');
            const players = card.getAttribute('data-players').split(',');
            const complexity = card.getAttribute('data-complexity');

            // Matches if search matches AND (group is empty OR group includes card's value)
            const matchesSearch = name.includes(query);
            const matchesVibe = selectedVibes.length === 0 || selectedVibes.some(v => category.includes(v));
            const matchesPlayers = selectedPlayers.length === 0 || selectedPlayers.some(p => players.includes(p));
            const matchesComplexity = selectedComplexity.length === 0 || selectedComplexity.includes(complexity);

            if (matchesSearch && matchesVibe && matchesPlayers && matchesComplexity) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 3. EVENT LISTENERS

    // Typing in Search Box
    gameSearch.addEventListener('input', filterLibrary);

    // Clicking Checkboxes
    checkboxes.forEach(box => {
        box.addEventListener('change', filterLibrary);
    });

    // Clicking Clear Button
    clearBtn.addEventListener('click', () => {
        gameSearch.value = "";
        checkboxes.forEach(cb => cb.checked = false);
        filterLibrary();
    });

    // Expanding Game Cards (Accordion)
    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        header.addEventListener('click', () => {
            // Toggle active class
            card.classList.toggle('active');
        });
    });
});
