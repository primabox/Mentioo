// Simple discussion modal handler
console.log('Discussion modal script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up modal...');
    
    const openBtn = document.getElementById('open-discussion-modal-btn');
    const modal = document.getElementById('discussion-modal');
    const overlay = document.querySelector('.discussion-modal-overlay');
    const cancelBtn = document.querySelector('.discussion-btn-cancel');
    const submitBtn = document.querySelector('.discussion-btn-submit');
    
    console.log('Button element:', openBtn);
    console.log('Modal element:', modal);
    console.log('Elements found:', {
        openBtn: !!openBtn,
        modal: !!modal,
        overlay: !!overlay,
        cancelBtn: !!cancelBtn,
        submitBtn: !!submitBtn
    });
    
    if (modal) {
        console.log('Modal current display:', window.getComputedStyle(modal).display);
        console.log('Modal current z-index:', window.getComputedStyle(modal).zIndex);
    }
    
    // Open modal
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            console.log('===== BUTTON CLICKED =====');
            console.log('Modal before:', modal);
            if (modal) {
                console.log('Setting display to flex...');
                
                modal.style.display = 'flex';
                modal.style.zIndex = '9999';
                
                // Prevent scrolling without layout shift
                document.documentElement.style.overflow = 'hidden';
                
                console.log('Modal display after:', modal.style.display);
                console.log('Modal computed display:', window.getComputedStyle(modal).display);
                console.log('Modal visibility:', window.getComputedStyle(modal).visibility);
                console.log('===== END =====');
            } else {
                console.error('Modal element not found!');
            }
        });
        console.log('Click listener added to button');
    } else {
        console.error('Open button not found!');
    }
    
    // Close modal function
    function closeModal() {
        console.log('Closing modal...');
        if (modal) {
            modal.style.display = 'none';
            document.documentElement.style.overflow = '';
            
            // Clear inputs
            const inputs = modal.querySelectorAll('input, textarea');
            inputs.forEach(input => input.value = '');
        }
    }
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Close on cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    // Submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const titleInput = modal.querySelector('.discussion-input');
            const textareaInput = modal.querySelector('.discussion-textarea');
            
            if (titleInput && textareaInput && titleInput.value.trim() && textareaInput.value.trim()) {
                alert('Téma bylo úspěšně přidáno!');
                closeModal();
            } else {
                alert('Prosím, vyplňte všechna pole.');
            }
        });
    }
});
