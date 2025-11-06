// Instructors Navigation
document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('.instructors-grid');
    const prevBtn = document.querySelector('.instructor-prev');
    const nextBtn = document.querySelector('.instructor-next');

    if (!grid || !prevBtn || !nextBtn) return;

    // Function to get scroll amount based on screen size
    function getScrollAmount() {
        const screenWidth = window.innerWidth;

        // On laptop (1024px and below), scroll by 2 cards
        if (screenWidth <= 1024) {
            // 361px card width + 24px gap = 385px per card
            // 2 cards = 770px
            return 770;
        }

        // On desktop, scroll by 3 cards
        return 1155; // (361 + 24) * 3
    }

    // Previous button
    prevBtn.addEventListener('click', function () {
        const scrollAmount = getScrollAmount();
        grid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Next button
    nextBtn.addEventListener('click', function () {
        const scrollAmount = getScrollAmount();
        grid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button states based on scroll position
    function updateButtonStates() {
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        const currentScroll = grid.scrollLeft;

        // Disable prev button at start
        if (currentScroll <= 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }

        // Disable next button at end
        if (currentScroll >= maxScroll - 1) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }

    // Initial button state
    updateButtonStates();

    // Update on scroll
    grid.addEventListener('scroll', updateButtonStates);

    // Update on window resize
    window.addEventListener('resize', updateButtonStates);
});
