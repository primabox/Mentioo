// Course Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    let currentFilter = 'aktivni'; // Default active filter
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the filter type from the tab text
            const tabText = this.querySelector('span').textContent.trim();
            let filterType;
            
            if (tabText.includes('Aktivní')) {
                filterType = 'aktivni';
            } else if (tabText.includes('Nezahájené')) {
                filterType = 'nezahajeny';
            } else if (tabText.includes('Dokončené')) {
                filterType = 'dokonceno';
            }
            
            // Check if clicking the same tab again
            if (this.classList.contains('active') && currentFilter === filterType) {
                // Toggle off - remove active and show all courses
                this.classList.remove('active');
                currentFilter = null;
                showAllCourses();
            } else {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                currentFilter = filterType;
                
                // Filter courses
                filterCourses(filterType);
            }
        });
    });
    
    function filterCourses(filterType) {
        const courseCards = document.querySelectorAll('.profile-tab-content[data-tab="moje-kurzy"] .course-card');
        
        courseCards.forEach(card => {
            const badge = card.querySelector('.course-badge');
            
            if (!badge) {
                card.style.display = 'none';
                return;
            }
            
            const badgeText = badge.textContent.trim();
            let shouldShow = false;
            
            if (filterType === 'aktivni' && badge.classList.contains('badge-bestseller')) {
                shouldShow = true;
            } else if (filterType === 'nezahajeny' && badge.classList.contains('badge-nezahajeny')) {
                shouldShow = true;
            } else if (filterType === 'dokonceno' && badge.classList.contains('badge-dokonceno')) {
                shouldShow = true;
            }
            
            card.style.display = shouldShow ? 'flex' : 'none';
        });
    }
    
    function showAllCourses() {
        const courseCards = document.querySelectorAll('.profile-tab-content[data-tab="moje-kurzy"] .course-card');
        courseCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
});
