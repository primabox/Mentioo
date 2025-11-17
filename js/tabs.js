document.addEventListener('DOMContentLoaded', function () {
    // Support legacy and prefixed tabs (dl-, de-, dc-, ip-)
    const tabs = document.querySelectorAll('.tab, .ip-tab, .dl-tab, .de-tab, .dc-tab');
    const tabContents = document.querySelectorAll('.tab-content, .ip-tab-content, .dl-tab-content, .de-tab-content, .dc-tab-content');
    // Prefer the container that exists for the current page
    const tabsContainer = document.querySelector('.tabs, .ip-tabs, .dl-tabs, .de-tabs, .dc-tabs');

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

    // Funkce pro aktivaci tabu
    function activateTab(targetTab) {
        // Remove all known active-class variants from all tabs (include ip- prefix)
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.classList.remove('ip-active');
            tab.classList.remove('dl-active');
            tab.classList.remove('de-active');
            tab.classList.remove('dc-active');
        });

        // Skrýt všechny obsahy tabů
        tabContents.forEach(content => {
            content.style.display = 'none';
        });

        // Close any open note tooltips when changing tabs (support prefixed variants)
        document.querySelectorAll('.note-hover-tooltip.active, .ip-note-hover-tooltip.ip-active, .dl-note-hover-tooltip.dl-active, .de-note-hover-tooltip.de-active, .dc-note-hover-tooltip.dc-active').forEach(tooltip => {
            tooltip.classList.remove('active');
            tooltip.classList.remove('ip-active');
            tooltip.classList.remove('dl-active');
            tooltip.classList.remove('de-active');
            tooltip.classList.remove('dc-active');
        });

        // Aktivovat vybraný tab - add the matching active class
        if (targetTab.classList.contains('ip-tab')) {
            targetTab.classList.add('ip-active');
        } else if (targetTab.classList.contains('dl-tab')) {
            targetTab.classList.add('dl-active');
        } else if (targetTab.classList.contains('de-tab')) {
            targetTab.classList.add('de-active');
        } else if (targetTab.classList.contains('dc-tab')) {
            targetTab.classList.add('dc-active');
        } else {
            targetTab.classList.add('active');
        }

        // Update sliding indicator
        updateSlidingIndicator(targetTab);

        // Zobrazit odpovídající obsah
        const tabId = targetTab.getAttribute('data-tab');
        // Try content selectors for legacy and prefixed variants (include ip-)
        let targetContent = document.querySelector(`[data-tab="${tabId}"].tab-content`);
        if (!targetContent) targetContent = document.querySelector(`[data-tab="${tabId}"].ip-tab-content`);
        if (!targetContent) targetContent = document.querySelector(`[data-tab="${tabId}"].dl-tab-content`);
        if (!targetContent) targetContent = document.querySelector(`[data-tab="${tabId}"].de-tab-content`);
        if (!targetContent) targetContent = document.querySelector(`[data-tab="${tabId}"].dc-tab-content`);

        if (targetContent) {
            targetContent.style.display = 'block';
        }

        // Zobrazit/skrýt seznam testů v sidebaru
        const testResultsList = document.querySelector('.test-results-list');
        const testResultsDefault = document.querySelector('.test-results-default');
        
        if (testResultsList && testResultsDefault) {
            if (tabId === 'curriculum') {
                testResultsList.style.display = 'block';
                testResultsDefault.style.display = 'none';
            } else {
                testResultsList.style.display = 'none';
                testResultsDefault.style.display = 'block';
            }
        }
    }


        // Inicializace - skrýt všechny obsahy
        tabContents.forEach(content => {
            content.style.display = 'none';
        });

        // Show content for the first active tab (support legacy and prefixed variants).
        // If no tab is marked active in the markup, fall back to the first tab in the DOM.
        let activeTab = document.querySelector('.tab.active') || document.querySelector('.ip-tab.ip-active') || document.querySelector('.dl-tab.dl-active') || document.querySelector('.de-tab.de-active') || document.querySelector('.dc-tab.dc-active') || tabs[0];
        if (activeTab) {
            // Use the shared activation routine so the indicator and content are set consistently
            activateTab(activeTab);
        }

    // Update on window resize
    window.addEventListener('resize', () => {
        const currentActiveTab = document.querySelector('.tab.active, .ip-tab.ip-active, .dl-tab.dl-active, .de-tab.de-active, .dc-tab.dc-active');
        if (currentActiveTab) {
            updateSlidingIndicator(currentActiveTab);
        }
    });

    // Přidat event listenery na všechny taby
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            activateTab(this);
        });
    });
});



;