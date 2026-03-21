function filterLibrary() {
    const query = document.getElementById('gameSearch').value.toLowerCase();
    const activeCats = Array.from(document.querySelectorAll('.category-check:checked')).map(c => c.value);
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const name = card.querySelector('h2').innerText.toLowerCase();
        const cats = card.getAttribute('data-category');
        const matchesSearch = name.includes(query);
        const matchesCat = activeCats.length === 0 || activeCats.some(c => cats.includes(c));
        card.style.display = (matchesSearch && matchesCat) ? "block" : "none";
    });
}
function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
    document.getElementById('gameSearch').value = "";
    filterLibrary();
}
