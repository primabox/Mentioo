document.addEventListener('DOMContentLoaded', function() {
    // Support both original and `pf-` prefixed markup
    const tabs = document.querySelectorAll('.settings-container .tab, .settings-container .tabs .tab, .pf-tabs .pf-tab, .pf-tabs-wrapper .pf-tab');
    const tabContents = document.querySelectorAll('.settings-tab-content, .pf-settings-tab-content');
    // tabsContainer may be different for prefixed markup; leave null if not found and resolve per-active-tab
    let tabsContainer = document.querySelector('.settings-container .tabs');

    // Function to update the sliding indicator
    function updateSlidingIndicator(activeTab) {
        if (!activeTab) return;

        // Prefer a container closest to the clicked tab (handles pf-tabs or original tabs)
        const container = activeTab.closest('.pf-tabs') || activeTab.closest('.tabs') || tabsContainer;
        if (!container) return;

        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const left = tabRect.left - containerRect.left;
        const width = tabRect.width;

        container.style.setProperty('--indicator-left', `${left}px`);
        container.style.setProperty('--indicator-width', `${width}px`);
    }

    // Initialize indicator on first active tab
    // Initialize indicator on first active tab (support prefixed variant)
    const activeTab = document.querySelector('.settings-container .tab.active, .pf-tabs .pf-tab.pf-active, .pf-tabs-wrapper .pf-tab.pf-active');
    if (activeTab) updateSlidingIndicator(activeTab);

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');

            // Remove active classes from all tabs (support both variants)
            tabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('pf-active');
            });

            // Add the correct active class based on markup
            if (this.classList.contains('pf-tab')) {
                this.classList.add('pf-active');
            } else {
                this.classList.add('active');
            }

            // Update sliding indicator
            updateSlidingIndicator(this);

            // Hide all tab contents (support both variants)
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.remove('pf-active');
            });

            // Show target tab content (prefer prefixed variant)
            let targetContent = document.querySelector(`.settings-tab-content[data-settings-tab="${targetTab}"]`);
            if (!targetContent) targetContent = document.querySelector(`.pf-settings-tab-content[data-settings-tab="${targetTab}"]`);
            if (targetContent) {
                if (targetContent.classList.contains('pf-settings-tab-content')) targetContent.classList.add('pf-active'); else targetContent.classList.add('active');
            }
        });
    });

    // Update indicator on window resize (support prefixed variant)
    window.addEventListener('resize', function() {
        const activeTab = document.querySelector('.settings-container .tab.active, .pf-tabs .pf-tab.pf-active, .pf-tabs-wrapper .pf-tab.pf-active');
        if (activeTab) updateSlidingIndicator(activeTab);
    });
});
