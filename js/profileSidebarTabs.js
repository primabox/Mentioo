// Profile Sidebar Menu Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-menu-item[data-tab], .pf-sidebar-menu-item[data-tab]');
    const tabContents = document.querySelectorAll('.profile-tab-content, .pf-profile-tab-content');
    const heroTabContents = document.querySelectorAll('.hero-tab-content, .pf-hero-tab-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetTab = item.getAttribute('data-tab');

            // Remove active class from all sidebar items (support pf- prefix)
            sidebarItems.forEach(si => {
                si.classList.remove('active');
                si.classList.remove('pf-active');
            });
            
            // Remove active class from all profile tab contents (support pf- prefix)
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.remove('pf-active');
            });
            
            // Remove active class from all hero tab contents (support pf- prefix)
            heroTabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.remove('pf-active');
            });

            // Add active class to clicked item (preserve prefix variant)
            if (item.classList.contains('pf-sidebar-menu-item')) {
                item.classList.add('pf-active');
            } else {
                item.classList.add('active');
            }
            
            // Show corresponding profile tab content
            // Show corresponding profile tab content (prefer prefixed variant)
            let targetContent = document.querySelector(`.profile-tab-content[data-tab="${targetTab}"]`);
            if (!targetContent) targetContent = document.querySelector(`.pf-profile-tab-content[data-tab="${targetTab}"]`);
            if (targetContent) {
                if (targetContent.classList.contains('pf-profile-tab-content')) targetContent.classList.add('pf-active'); else targetContent.classList.add('active');
            }
            
            // Show corresponding hero tab content
            // Show corresponding hero tab content (prefer prefixed variant)
            let targetHeroContent = document.querySelector(`.hero-tab-content[data-tab="${targetTab}"]`);
            if (!targetHeroContent) targetHeroContent = document.querySelector(`.pf-hero-tab-content[data-tab="${targetTab}"]`);
            if (targetHeroContent) {
                if (targetHeroContent.classList.contains('pf-hero-tab-content')) targetHeroContent.classList.add('pf-active'); else targetHeroContent.classList.add('active');
            }
        });
    });
});
