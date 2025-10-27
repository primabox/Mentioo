document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabsContainer = document.querySelector('.tabs');

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
        // Odstranit aktivní třídu ze všech tabů
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Skrýt všechny obsahy tabů
        tabContents.forEach(content => {
            content.style.display = 'none';
        });

        // Aktivovat vybraný tab
        targetTab.classList.add('active');

        // Update sliding indicator
        updateSlidingIndicator(targetTab);

        // Zobrazit odpovídající obsah
        const tabId = targetTab.getAttribute('data-tab');
        const targetContent = document.querySelector(`[data-tab="${tabId}"].tab-content`);

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

    // Inicializace - skrýt všechny obsahy kromě aktivního
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    // Zobrazit obsah prvního aktivního tabu
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const activeTabId = activeTab.getAttribute('data-tab');
        const activeContent = document.querySelector(`[data-tab="${activeTabId}"].tab-content`);
        if (activeContent) {
            activeContent.style.display = 'block';
        }
        // Initialize sliding indicator
        updateSlidingIndicator(activeTab);
    }

    // Update on window resize
    window.addEventListener('resize', () => {
        const currentActiveTab = document.querySelector('.tab.active');
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