document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.messages-tab, .pf-messages-tab');
    const sections = document.querySelectorAll('.messages-section, .pf-messages-section');
    const messagesMenuItem = document.querySelector('.sidebar-menu-item[data-tab="zpravy"], .pf-sidebar-menu-item[data-tab="zpravy"]');
    const messageItems = document.querySelectorAll('.message-item, .pf-message-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const isActive = this.classList.contains('active') || this.classList.contains('pf-active');

            // Toggle logic - if clicking active tab, deactivate and show all
            if (isActive) {
                // Deactivate the tab (remove both legacy and pf variants)
                this.classList.remove('active');
                this.classList.remove('pf-active');
                
                // Remove notification dot
                if (messagesMenuItem) {
                    messagesMenuItem.classList.remove('has-unread');
                    messagesMenuItem.classList.remove('pf-has-unread');
                }
                
                // Show all messages
                messageItems.forEach(item => {
                    item.style.display = 'flex';
                    item.classList.remove('show-unread-indicator');
                });
                
                // Show all sections
                sections.forEach(section => {
                    section.style.display = 'block';
                });
                
                return;
            }

            // Remove active class from all tabs (legacy + pf)
            tabs.forEach(t => { t.classList.remove('active'); t.classList.remove('pf-active'); });
            
            // Add active class to clicked tab (support pf- prefix)
            if (this.classList.contains('pf-messages-tab')) this.classList.add('pf-active'); else this.classList.add('active');

            // Show/hide notification dot on sidebar menu
            if (filter === 'all' && messagesMenuItem) {
                messagesMenuItem.classList.add('has-unread');
                messagesMenuItem.classList.add('pf-has-unread');
            } else if (messagesMenuItem) {
                messagesMenuItem.classList.remove('has-unread');
                messagesMenuItem.classList.remove('pf-has-unread');
            }

            // Filter message items when in "Nepřečtené" tab
            if (filter === 'all') {
                messageItems.forEach(item => {
                    if (item.getAttribute('data-unread') === 'true') {
                        item.style.display = 'flex';
                        item.classList.add('show-unread-indicator');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('show-unread-indicator');
                    }
                });
            } else {
                // Show all messages in other tabs
                messageItems.forEach(item => {
                    item.style.display = 'flex';
                    item.classList.remove('show-unread-indicator');
                });
            }

            // Filter sections
            sections.forEach(section => {
                const category = section.getAttribute('data-category');
                
                if (filter === 'all') {
                    // Show all sections
                    section.style.display = 'block';
                } else if (category === filter) {
                    // Show matching section
                    section.style.display = 'block';
                } else {
                    // Hide non-matching sections
                    section.style.display = 'none';
                }
            });
        });
    });
});
