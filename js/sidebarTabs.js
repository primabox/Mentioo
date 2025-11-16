// Sidebar tabs - support legacy and prefixed variants (dl-, de-, dc-)
  const sidebarTabs = document.querySelectorAll('.sidebar-tab, .dl-sidebar-tab, .de-sidebar-tab, .dc-sidebar-tab');
  const sidebarTabContents = document.querySelectorAll('.sidebar-tab-content, .dl-sidebar-tab-content, .de-sidebar-tab-content, .dc-sidebar-tab-content');
  const sidebarTabsContainer = document.querySelector('.sidebar-tabs, .dl-sidebar-tabs, .de-sidebar-tabs, .dc-sidebar-tabs');

    // Function to update the sliding indicator
    function updateSlidingIndicator(activeTab) {
      if (!sidebarTabsContainer || !activeTab) return;
      
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = sidebarTabsContainer.getBoundingClientRect();
      const left = tabRect.left - containerRect.left;
      const width = tabRect.width;
      
      sidebarTabsContainer.style.setProperty('--indicator-left', `${left}px`);
      sidebarTabsContainer.style.setProperty('--indicator-width', `${width}px`);
    }

    // Initialize on page load - find any active tab variant
    const initialActiveTab = document.querySelector('.sidebar-tab.active, .dl-sidebar-tab.dl-active, .de-sidebar-tab.de-active, .dc-sidebar-tab.dc-active');
    if (initialActiveTab) {
      updateSlidingIndicator(initialActiveTab);
    }

    // Update on window resize
    window.addEventListener('resize', () => {
      const activeTab = document.querySelector('.sidebar-tab.active, .dl-sidebar-tab.dl-active, .de-sidebar-tab.de-active, .dc-sidebar-tab.dc-active');
      if (activeTab) {
        updateSlidingIndicator(activeTab);
      }
    });

    sidebarTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // Remove all known active-class variants from sidebar tabs
        sidebarTabs.forEach(t => {
          t.classList.remove('active');
          t.classList.remove('dl-active');
          t.classList.remove('de-active');
          t.classList.remove('dc-active');
        });

        // Hide all sidebar tab contents (remove any active variants)
        sidebarTabContents.forEach(content => {
          content.classList.remove('active');
          content.classList.remove('dl-active');
          content.classList.remove('de-active');
          content.classList.remove('dc-active');
        });

        // Add the matching active class to the clicked tab depending on its prefix
        if (tab.classList.contains('dl-sidebar-tab')) {
          tab.classList.add('dl-active');
        } else if (tab.classList.contains('de-sidebar-tab')) {
          tab.classList.add('de-active');
        } else if (tab.classList.contains('dc-sidebar-tab')) {
          tab.classList.add('dc-active');
        } else {
          tab.classList.add('active');
        }

        // Update sliding indicator
        updateSlidingIndicator(tab);

        // Show corresponding tab content - prefer matching prefixed content
        let activeContent = document.querySelector(`.sidebar-tab-content[data-content="${tabName}"]`);
        if (!activeContent) activeContent = document.querySelector(`.dl-sidebar-tab-content[data-content="${tabName}"]`);
        if (!activeContent) activeContent = document.querySelector(`.de-sidebar-tab-content[data-content="${tabName}"]`);
        if (!activeContent) activeContent = document.querySelector(`.dc-sidebar-tab-content[data-content="${tabName}"]`);

        if (activeContent) {
          // Add corresponding active class on the content element
          if (activeContent.classList.contains('dl-sidebar-tab-content')) {
            activeContent.classList.add('dl-active');
          } else if (activeContent.classList.contains('de-sidebar-tab-content')) {
            activeContent.classList.add('de-active');
          } else if (activeContent.classList.contains('dc-sidebar-tab-content')) {
            activeContent.classList.add('dc-active');
          } else {
            activeContent.classList.add('active');
          }
        }
      });
    });