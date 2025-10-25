document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

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

        // Zobrazit odpovídající obsah
        const tabId = targetTab.getAttribute('data-tab');
        const targetContent = document.querySelector(`[data-tab="${tabId}"].tab-content`);

        if (targetContent) {
            targetContent.style.display = 'block';
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
    }

    // Přidat event listenery na všechny taby
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            activateTab(this);
        });
    });
});



;