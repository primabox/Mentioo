// Sidebar tabs
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');
    const sidebarTabContents = document.querySelectorAll('.sidebar-tab-content');
    const sidebarTabsContainer = document.querySelector('.sidebar-tabs');

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

    // Initialize on page load
    const initialActiveTab = document.querySelector('.sidebar-tab.active');
    if (initialActiveTab) {
      updateSlidingIndicator(initialActiveTab);
    }

    // Update on window resize
    window.addEventListener('resize', () => {
      const activeTab = document.querySelector('.sidebar-tab.active');
      if (activeTab) {
        updateSlidingIndicator(activeTab);
      }
    });

    sidebarTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // Remove active class from all sidebar tabs
        sidebarTabs.forEach(t => t.classList.remove('active'));

        // Hide all sidebar tab contents
        sidebarTabContents.forEach(content => {
          content.classList.remove('active');
        });

        // Add active class to clicked tab
        tab.classList.add('active');

        // Update sliding indicator
        updateSlidingIndicator(tab);

        // Show corresponding tab content
        const activeContent = document.querySelector(`.sidebar-tab-content[data-content="${tabName}"]`);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });