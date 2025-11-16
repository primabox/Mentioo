// Messages section collapse functionality
document.addEventListener('DOMContentLoaded', () => {
    const messageSections = document.querySelectorAll('.messages-section, .pf-messages-section');

    messageSections.forEach(section => {
        const header = section.querySelector('.messages-section-header, .pf-messages-section-header');
        const collapseBtn = section.querySelector('.messages-collapse-btn, .pf-messages-collapse-btn');
        const icon = collapseBtn ? collapseBtn.querySelector('i') : null;

        // Set initial state - all sections start open (rotated 180deg)
        if (icon) icon.style.transform = 'rotate(180deg)';

        if (!header) return;

        header.addEventListener('click', () => {
            // Toggle collapsed class
            section.classList.toggle('collapsed');

            // Rotate icon (open = chevron down rotated 180deg, collapsed = chevron down at 0deg)
            if (icon) {
                if (section.classList.contains('collapsed')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
});
