// Diskuze functionality

// Discussion Modal Functions
function openDiscussionModal() {
    console.log('openDiscussionModal called');
    const modal = document.getElementById('discussion-modal');
    console.log('Modal element:', modal);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened');
    } else {
        console.error('Modal not found!');
    }
}

function closeDiscussionModal() {
    console.log('closeDiscussionModal called');
    const modal = document.getElementById('discussion-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear form inputs
        const inputs = modal.querySelectorAll('input, textarea');
        inputs.forEach(input => input.value = '');
    }
}

function submitDiscussionTopic() {
    const modal = document.getElementById('discussion-modal');
    const titleInput = modal.querySelector('.discussion-input');
    const textareaInput = modal.querySelector('.discussion-textarea');
    
    if (titleInput.value.trim() && textareaInput.value.trim()) {
        alert('Téma bylo úspěšně přidáno!');
        closeDiscussionModal();
    } else {
        alert('Prosím, vyplňte všechna pole.');
    }
}

// Make modal functions globally available
window.openDiscussionModal = openDiscussionModal;
window.closeDiscussionModal = closeDiscussionModal;
window.submitDiscussionTopic = submitDiscussionTopic;

// Add event listener for the button
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - setting up discussion modal');
    
    const openModalBtn = document.getElementById('open-discussion-modal-btn');
    console.log('Open modal button:', openModalBtn);
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            console.log('Button clicked!');
            openDiscussionModal();
        });
    } else {
        console.error('Open modal button not found!');
    }
    
    // Close modal when clicking on overlay
    const modal = document.getElementById('discussion-modal');
    const overlay = document.querySelector('.discussion-modal-overlay');
    
    if (overlay) {
        overlay.addEventListener('click', closeDiscussionModal);
    }
});

function openDiskuzeDetail(postId) {
    const listView = document.getElementById('diskuze-list-view');
    const detailView = document.getElementById('diskuze-detail-view');

    if (listView && detailView) {
        listView.style.display = 'none';
        detailView.style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function closeDiskuzeDetail() {
    const listView = document.getElementById('diskuze-list-view');
    const detailView = document.getElementById('diskuze-detail-view');

    if (listView && detailView) {
        detailView.style.display = 'none';
        listView.style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Make functions globally available for onclick handlers
window.openDiskuzeDetail = openDiskuzeDetail;
window.closeDiskuzeDetail = closeDiskuzeDetail;

function submitMainReply(button) {
    const form = button.closest('.diskuze-reply-form');
    const textarea = form.querySelector('.diskuze-reply-textarea');

    if (textarea && textarea.value.trim()) {
        alert('Odpověď byla úspěšně odeslána!');
        textarea.value = '';
    } else {
        alert('Prosím, napište nějaký text.');
    }
}

function submitReply(button) {
    const form = button.closest('.diskuze-reply-form');
    const textarea = form.querySelector('.diskuze-reply-input');

    if (textarea && textarea.value.trim()) {
        const replyText = textarea.value.trim();
        
        // Check if replying to original post
        const isReplyingToOP = form.previousElementSibling && form.previousElementSibling.classList.contains('diskuze-op-stats');
        
        if (isReplyingToOP) {
            // Create new top-level comment for replies to original post
            const newComment = document.createElement('div');
            newComment.className = 'diskuze-comment';
            newComment.innerHTML = `
                <img src="img/lektorkaDiskuze.jpg" alt="Avatar" class="diskuze-comment-avatar">
                <div class="diskuze-comment-content">
                    <span class="diskuze-comment-author">Bob</span>
                    <p class="diskuze-comment-text">${replyText}</p>
                    <div class="diskuze-comment-actions">
                        <button class="diskuze-comment-like">
                            <img src="img/thumb_up.png" alt=""> 0
                        </button>
                        <button class="diskuze-comment-reply">
                            <i class="fas fa-reply"></i> Odpovědět
                        </button>
                    </div>
                </div>
            `;
            
            // Add the new comment to the comments section
            const commentsSection = document.querySelector('.diskuze-comments');
            commentsSection.insertBefore(newComment, commentsSection.firstChild);
            
            // Remove the form
            form.remove();
            
            // Add event listeners to the new comment buttons
            const newLikeBtn = newComment.querySelector('.diskuze-comment-like');
            const newReplyBtn = newComment.querySelector('.diskuze-comment-reply');
            
            newLikeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });
            
            newReplyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showReplyForm(this);
            });
            
        } else {
            // Create nested reply for replies to comments
            const newReply = document.createElement('div');
            newReply.className = 'diskuze-reply';
            newReply.innerHTML = `
                <img src="img/lektorkaDiskuze.jpg" alt="Avatar" class="diskuze-comment-avatar">
                <div class="diskuze-comment-content">
                    <span class="diskuze-comment-author">Bob</span>
                    <p class="diskuze-comment-text">${replyText}</p>
                    <div class="diskuze-comment-actions">
                        <button class="diskuze-comment-like">
                            <img src="img/thumb_up.png" alt=""> 0
                        </button>
                        <button class="diskuze-comment-reply">
                            <i class="fas fa-reply"></i> Odpovědět
                        </button>
                    </div>
                </div>
            `;

            // Find the parent comment content and insert the reply
            const commentContent = form.closest('.diskuze-comment-content');
            
            // Remove the form
            form.remove();
            
            // Append the new reply to the comment content
            commentContent.appendChild(newReply);

            // Add event listeners to the new reply buttons
            const newLikeBtn = newReply.querySelector('.diskuze-comment-like');
            const newReplyBtn = newReply.querySelector('.diskuze-comment-reply');
            
            newLikeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });
            
            newReplyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showReplyForm(this);
            });
        }
        
    } else {
        alert('Prosím, napište nějaký text.');
    }
}

function showReplyForm(button) {
    // Remove any existing reply forms first
    const existingForms = document.querySelectorAll('.diskuze-reply-form');
    existingForms.forEach(form => form.remove());

    // Check if this is the original post or a regular comment
    const isOriginalPost = button.closest('.diskuze-original-post');
    
    // Create reply form
    const replyForm = document.createElement('div');
    replyForm.className = 'diskuze-reply-form';
    replyForm.innerHTML = `
        <label class="diskuze-reply-label">Napište vaši odpověď</label>
        <textarea class="diskuze-reply-input" placeholder="Napište vaši odpověď..." rows="5"></textarea>
        <div class="diskuze-reply-actions">
            <button class="diskuze-reply-submit" onclick="submitReply(this)">
                Zveřejnit odpověď
            </button>
            <button class="diskuze-reply-cancel" onclick="this.closest('.diskuze-reply-form').remove()">
                Zrušit
            </button>
        </div>
    `;

    if (isOriginalPost) {
        // For original post, insert after diskuze-op-stats
        const opStats = button.closest('.diskuze-op-stats');
        opStats.insertAdjacentElement('afterend', replyForm);
    } else {
        // For regular comments, find the comment content and insert after comment actions
        const commentContent = button.closest('.diskuze-comment-content');
        if (!commentContent) return;
        
        const commentActions = button.closest('.diskuze-comment-actions');
        commentActions.insertAdjacentElement('afterend', replyForm);
    }

    // Focus on textarea
    const textarea = replyForm.querySelector('.diskuze-reply-input');
    textarea.focus();
}

// Toggle like button
document.addEventListener('DOMContentLoaded', function () {
    const likeButtons = document.querySelectorAll('.diskuze-like-btn, .diskuze-comment-like');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    });

    // Add click handlers to reply buttons
    const replyButtons = document.querySelectorAll('.diskuze-comment-reply');
    replyButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            showReplyForm(this);
        });
    });
});

// Make functions globally available for onclick handlers
window.submitReply = submitReply;
window.submitMainReply = submitMainReply;
