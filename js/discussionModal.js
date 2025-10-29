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
                
                // Prevent scrolling on both body and html
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                
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
            
            // Restore scrolling on both body and html
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            
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
                // Close modal first to restore scrolling
                closeModal();
                
                // Then create new discussion post with a small delay
                setTimeout(() => {
                    addNewDiscussionPost(titleInput.value, textareaInput.value);
                }, 100);
            } else {
                alert('Prosím, vyplňte všechna pole.');
            }
        });
    }
});

// Function to add new discussion post
function addNewDiscussionPost(title, text) {
    const diskuzePosts = document.querySelector('.diskuze-posts');
    
    if (!diskuzePosts) {
        console.error('Diskuze posts container not found');
        return;
    }
    
    // Create new post element
    const newPost = document.createElement('div');
    newPost.className = 'diskuze-post';
    
    const now = new Date();
    const timeAgo = 'Právě teď';
    
    newPost.innerHTML = `
        <img src="img/lektorkaDiskuze.jpg" alt="Avatar" class="diskuze-avatar">
        <div class="diskuze-content">
            <span class="diskuze-author">Vy</span>
            <span class="diskuze-topic-label">Téma</span>
            <h4 class="diskuze-post-title">${escapeHtml(title)}</h4>
            <p class="diskuze-post-text">${escapeHtml(text)}</p>
            <div class="diskuze-stats">
                <span class="diskuze-stat">
                    <i class="far fa-thumbs-up"></i> 0
                </span>
                <span class="diskuze-stat">
                    <i class="far fa-eye"></i> 1
                </span>
                <span class="diskuze-stat">
                    <i class="far fa-comment"></i> 0
                </span>
                <span class="diskuze-time">${timeAgo}</span>
            </div>
        </div>
    `;
    
    // Insert at the beginning
    diskuzePosts.insertBefore(newPost, diskuzePosts.firstChild);
    
    // Update count
    const countElement = document.querySelector('.diskuze-count');
    if (countElement) {
        const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]);
        countElement.textContent = `${currentCount + 1} příspěvků`;
    }
    
    // Smooth scroll to new post
    newPost.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Add highlight animation
    newPost.style.animation = 'highlight 2s ease';
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS animation for highlight effect
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0% { background-color: #D4EDFF; }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);
