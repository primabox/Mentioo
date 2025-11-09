// Test Failed Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('test-failed-modal');
    const openBtn = document.querySelector('.test-start-btn');
    const closeBtn = modal?.querySelector('.test-modal-close');
    const overlay = modal?.querySelector('.test-modal-overlay');

    // Otevřít modal po kliknutí na "Ukončit test"
    openBtn?.addEventListener('click', () => {
        modal?.classList.add('active');
    });

    // Zavřít modal po kliknutí na X
    closeBtn?.addEventListener('click', () => {
        modal?.classList.remove('active');
    });

    // Zavřít modal po kliknutí na overlay (pozadí)
    overlay?.addEventListener('click', () => {
        modal?.classList.remove('active');
    });

    // Zavřít modal klávesou Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});
