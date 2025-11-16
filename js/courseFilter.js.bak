// Course Filter Functionality for Moje Kurzy
document.addEventListener('DOMContentLoaded', function() {
    // Moje kurzy filters
    const courseFilterTabs = document.querySelectorAll('.profile-tab-content[data-tab="moje-kurzy"] .filter-tab');
    let currentCourseFilter = 'aktivni';
    
    courseFilterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabText = this.querySelector('span').textContent.trim();
            let filterType;
            
            if (tabText.includes('Aktivní')) {
                filterType = 'aktivni';
            } else if (tabText.includes('Nezahájené')) {
                filterType = 'nezahajeny';
            } else if (tabText.includes('Dokončené')) {
                filterType = 'dokonceno';
            }
            
            if (this.classList.contains('active') && currentCourseFilter === filterType) {
                this.classList.remove('active');
                currentCourseFilter = null;
                showAllCourses();
            } else {
                courseFilterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentCourseFilter = filterType;
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
    
    // Purchase History Filters
    const purchaseFilterTabs = document.querySelectorAll('.profile-tab-content[data-tab="historie-nakupu"] .filter-tab');
    let currentPurchaseFilter = 'kurzy';
    
    purchaseFilterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            
            if (this.classList.contains('active') && currentPurchaseFilter === filterType) {
                this.classList.remove('active');
                currentPurchaseFilter = null;
                showAllPurchases();
            } else {
                purchaseFilterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentPurchaseFilter = filterType;
                filterPurchases(filterType);
            }
        });
    });
    
    function filterPurchases(filterType) {
        const tableRows = document.querySelectorAll('.purchase-history-table tbody tr');
        tableRows.forEach(row => {
            const category = row.getAttribute('data-category');
            if (category === filterType) {
                row.classList.remove('filter-hidden');
            } else {
                row.classList.add('filter-hidden');
            }
        });
        
        const mobileCards = document.querySelectorAll('.purchase-card');
        mobileCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category === filterType) {
                card.classList.remove('filter-hidden');
            } else {
                card.classList.add('filter-hidden');
            }
        });
    }
    
    function showAllPurchases() {
        const tableRows = document.querySelectorAll('.purchase-history-table tbody tr');
        tableRows.forEach(row => {
            row.classList.remove('filter-hidden');
        });
        
        const mobileCards = document.querySelectorAll('.purchase-card');
        mobileCards.forEach(card => {
            card.classList.remove('filter-hidden');
        });
    }
});
