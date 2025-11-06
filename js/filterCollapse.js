// Filter Collapse/Expand functionality
document.addEventListener('DOMContentLoaded', () => {
    const collapseButtons = document.querySelectorAll('.filter-collapse-btn');

    collapseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterSection = button.closest('.filter-section');
            const icon = button.querySelector('i');

            // Toggle collapsed class
            filterSection.classList.toggle('collapsed');

            // Rotate icon (open = chevron up = 180deg, collapsed = chevron down = 0deg)
            if (filterSection.classList.contains('collapsed')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
