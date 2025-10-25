// Diskuze functionality

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
    const textarea = form.querySelector('.diskuze-reply-textarea');

    if (textarea && textarea.value.trim()) {
        alert('Odpověď byla úspěšně odeslána!');

        // Hide the form
        form.remove();
    } else {
        alert('Prosím, napište nějaký text.');
    }
}

function showReplyForm(button) {
    // Remove any existing reply forms first
    const existingForms = document.querySelectorAll('.diskuze-reply-form');
    existingForms.forEach(form => form.remove());

    const comment = button.closest('.diskuze-comment');

    // Create reply form
    const replyForm = document.createElement('div');
    replyForm.className = 'diskuze-reply-form';
    replyForm.style.marginTop = '16px';
    replyForm.innerHTML = `
        <h4 class="diskuze-reply-form-title">Napište vaši odpověď</h4>
        <textarea class="diskuze-reply-textarea" placeholder="Napište vaši odpověď..." rows="5"></textarea>
        <div style="display: flex; gap: 12px;">
            <button class="diskuze-submit-btn" onclick="submitReply(this)">
                Zveřejnit odpověď
            </button>
            <button class="diskuze-cancel-btn" onclick="this.closest('.diskuze-reply-form').remove()">
                Zrušit
            </button>
        </div>
    `;

    comment.appendChild(replyForm);

    // Focus on textarea
    const textarea = replyForm.querySelector('.diskuze-reply-textarea');
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

