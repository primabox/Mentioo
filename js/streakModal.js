// Streak Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('streakModal');
    const openBtn = document.querySelector('.streak-info-btn');
    const closeBtn = document.querySelector('.streak-modal-close');
    const overlay = document.querySelector('.streak-modal-overlay');
    const continueBtn = document.querySelector('.streak-modal-btn');
    
    // Open modal
    if (openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Close on continue button
    if (continueBtn) {
        continueBtn.addEventListener('click', closeModal);
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
