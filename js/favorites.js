// Favorites functionality
document.addEventListener('DOMContentLoaded', function () {
    const favoriteToggle = document.getElementById('favorite-toggle');
    const favoriteIcon = document.getElementById('favorite-icon');
    const favoriteText = document.getElementById('favorite-text');

    if (favoriteToggle && favoriteIcon && favoriteText) {
        let isFavorite = false;

        favoriteToggle.addEventListener('click', function () {
            isFavorite = !isFavorite;

            if (isFavorite) {
                // Změna na "added to favorites" stav
                favoriteIcon.src = 'img/favorite icon-filled.png'; // Předpokládám, že máte plnou ikonu
                favoriteText.textContent = 'Lekce přidána do oblíbených';
                favoriteToggle.style.color = '#0069B2';
            } else {
                // Změna zpět na "add to favorites" stav
                favoriteIcon.src = 'img/favorite icon.png';
                favoriteText.textContent = 'Přidat lekci do oblíbených';
                favoriteToggle.style.color = '#1C1C1C';
            }
        });
    }
});