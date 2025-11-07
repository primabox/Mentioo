// Messages section collapse functionality
document.addEventListener('DOMContentLoaded', () => {
    const messageSections = document.querySelectorAll('.messages-section');

    messageSections.forEach(section => {
        const header = section.querySelector('.messages-section-header');
        const collapseBtn = section.querySelector('.messages-collapse-btn');
        const icon = collapseBtn.querySelector('i');

        // Set initial state - all sections start open (rotated 180deg)
        icon.style.transform = 'rotate(180deg)';

        header.addEventListener('click', () => {
            // Toggle collapsed class
            section.classList.toggle('collapsed');

            // Rotate icon (open = chevron down rotated 180deg, collapsed = chevron down at 0deg)
            if (section.classList.contains('collapsed')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
