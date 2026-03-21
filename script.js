document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECT ELEMENTS ---
    const gameSearch = document.getElementById('gameSearch');
    const clearBtn = document.getElementById('clearFiltersBtn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const gameCards = document.querySelectorAll('.game-card');

    // --- 2. GAME LIBRARY LOGIC (Only runs if elements exist) ---
    
    if (gameSearch) {
        gameSearch.addEventListener('input', filterLibrary);
    }

    if (checkboxes.length > 0) {
        checkboxes.forEach(box => {
            box.addEventListener('change', filterLibrary);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            gameSearch.value = "";
            checkboxes.forEach(cb => cb.checked = false);
            filterLibrary();
        });
    }

    if (gameCards.length > 0) {
        gameCards.forEach(card => {
            const header = card.querySelector('.game-header');
            if (header) {
                header.addEventListener('click', () => {
                    card.classList.toggle('active');
                });
            }
        });
    }

    // --- 3. FILTER FUNCTION ---
    function filterLibrary() {
        // Double check we have a search bar before trying to get its value
        if (!gameSearch) return;

        const query = gameSearch.value.toLowerCase();
        
        const selectedVibes = Array.from(document.querySelectorAll('.category-check:checked')).map(cb => cb.value);
        const selectedPlayers = Array.from(document.querySelectorAll('.player-check:checked')).map(cb => cb.value);
        const selectedComplexity = Array.from(document.querySelectorAll('.complexity-check:checked')).map(cb => cb.value);

        gameCards.forEach(card => {
            const name = card.querySelector('h2').innerText.toLowerCase();
            const category = card.getAttribute('data-category') || "";
            const players = (card.getAttribute('data-players') || "").split(',');
            const complexity = card.getAttribute('data-complexity') || "";

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
});
