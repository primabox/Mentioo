document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.messages-tab');
    const sections = document.querySelectorAll('.messages-section');
    const messagesMenuItem = document.querySelector('.sidebar-menu-item[data-tab="zpravy"]');
    const messageItems = document.querySelectorAll('.message-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const isActive = this.classList.contains('active');

            // Toggle logic - if clicking active tab, deactivate and show all
            if (isActive) {
                // Deactivate the tab
                this.classList.remove('active');
                
                // Remove notification dot
                if (messagesMenuItem) {
                    messagesMenuItem.classList.remove('has-unread');
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

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Show/hide notification dot on sidebar menu
            if (filter === 'all' && messagesMenuItem) {
                messagesMenuItem.classList.add('has-unread');
            } else if (messagesMenuItem) {
                messagesMenuItem.classList.remove('has-unread');
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
