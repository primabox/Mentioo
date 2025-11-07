// Profile Sidebar Menu Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-menu-item[data-tab]');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    const heroTabContents = document.querySelectorAll('.hero-tab-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetTab = item.getAttribute('data-tab');

            // Remove active class from all sidebar items
            sidebarItems.forEach(si => si.classList.remove('active'));
            
            // Remove active class from all profile tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Remove active class from all hero tab contents
            heroTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding profile tab content
            const targetContent = document.querySelector(`.profile-tab-content[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Show corresponding hero tab content
            const targetHeroContent = document.querySelector(`.hero-tab-content[data-tab="${targetTab}"]`);
            if (targetHeroContent) {
                targetHeroContent.classList.add('active');
            }
        });
    });
});
