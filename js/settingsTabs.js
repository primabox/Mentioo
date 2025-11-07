document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.settings-container .tab');
    const tabContents = document.querySelectorAll('.settings-tab-content');
    const tabsContainer = document.querySelector('.settings-container .tabs');

    // Function to update the sliding indicator
    function updateSlidingIndicator(activeTab) {
        if (!tabsContainer || !activeTab) return;
        
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const left = tabRect.left - containerRect.left;
        const width = tabRect.width;
        
        tabsContainer.style.setProperty('--indicator-left', `${left}px`);
        tabsContainer.style.setProperty('--indicator-width', `${width}px`);
    }

    // Initialize indicator on first active tab
    const activeTab = document.querySelector('.settings-container .tab.active');
    if (activeTab) {
        updateSlidingIndicator(activeTab);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Update sliding indicator
            updateSlidingIndicator(this);
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show target tab content
            const targetContent = document.querySelector(`.settings-tab-content[data-settings-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Update indicator on window resize
    window.addEventListener('resize', function() {
        const activeTab = document.querySelector('.settings-container .tab.active');
        if (activeTab) {
            updateSlidingIndicator(activeTab);
        }
    });
});
