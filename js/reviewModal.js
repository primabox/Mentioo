// Review Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const writeReviewBtn = document.querySelector('.write-review-btn');
    const reviewModal = document.getElementById('reviewModal');
    const cancelReviewBtn = document.getElementById('cancelReview');
    const submitReviewBtn = document.getElementById('submitReview');
    const modalOverlay = document.querySelector('.review-modal-overlay');
    const stars = document.querySelectorAll('#modalStars i');
    let selectedRating = 0;

    // Function to add review to the list
    function addReviewToList(reviewData) {
        const reviewsGrid = document.querySelector('.reviews-grid');
        if (!reviewsGrid) {
            console.error('Reviews grid not found');
            return;
        }

        // Create stars HTML based on rating
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }

        // Create positive feedback section if exists
        let positiveFeedbackHtml = '';
        if (reviewData.positive && reviewData.positive.trim()) {
            positiveFeedbackHtml = `
                <div class="review-feedback review-feedback-positive">
                    <img src="img/check_circle.png" alt="">
                    <p class="review-feedback-text">${reviewData.positive}</p>
                </div>
            `;
        }

        // Create negative feedback section if exists
        let negativeFeedbackHtml = '';
        if (reviewData.negative && reviewData.negative.trim()) {
            negativeFeedbackHtml = `
                <div class="review-feedback review-feedback-negative">
                    <img src="img/do_not_disturb_on.png" alt="">
                    <p class="review-feedback-text">${reviewData.negative}</p>
                </div>
            `;
        }

        // Create new review card
        const newReviewCard = `
            <div class="review-card" style="animation: fadeIn 0.5s ease;">
                <img src="img/quotes.png" alt="quotes" class="review-card-quotes">
                <div class="review-card-header">
                    <img src="img/reviewer.png" alt="Vy" class="review-card-avatar">
                    <div class="review-card-meta">
                        <h3 class="review-card-author">Vy</h3>
                        <div class="review-card-stars-date">
                            <div class="review-card-stars">
                                ${starsHtml}
                            </div>
                            <p class="review-card-date">právě teď</p>
                        </div>
                    </div>
                </div>
                <div class="review-card-divider"></div>
                <p class="review-card-text">${reviewData.experience}</p>
                ${positiveFeedbackHtml}
                ${negativeFeedbackHtml}
            </div>
        `;

        // Insert at the beginning of reviews grid
        reviewsGrid.insertAdjacentHTML('afterbegin', newReviewCard);

        // Scroll to the new review
        setTimeout(() => {
            const firstReview = reviewsGrid.firstElementChild;
            if (firstReview) {
                firstReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }

    // Open modal
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', () => {
            reviewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    const closeModal = () => {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
    };

    if (cancelReviewBtn) {
        cancelReviewBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Star rating
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            updateStars();
        });

        star.addEventListener('mouseenter', () => {
            const hoverRating = parseInt(star.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    // Reset stars on mouse leave
    const starsContainer = document.getElementById('modalStars');
    if (starsContainer) {
        starsContainer.addEventListener('mouseleave', updateStars);
    }

    function updateStars() {
        stars.forEach((star, index) => {
            if (index < selectedRating) {
                star.classList.remove('far');
                star.classList.add('fas', 'active');
            } else {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            }
        });
    }

    // Submit review
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            const experienceText = document.getElementById('experienceText').value;
            const positiveText = document.getElementById('positiveText').value;
            const negativeText = document.getElementById('negativeText').value;

            if (selectedRating === 0) {
                alert('Prosím, vyberte hodnocení hvězdičkami.');
                return;
            }

            if (!experienceText.trim()) {
                alert('Prosím, popište svoji zkušenost s kurzem.');
                return;
            }

            // Add new review to the list
            addReviewToList({
                rating: selectedRating,
                experience: experienceText,
                positive: positiveText,
                negative: negativeText
            });

            closeModal();
        });
    }

    function resetForm() {
        selectedRating = 0;
        updateStars();
        document.getElementById('experienceText').value = '';
        document.getElementById('positiveText').value = '';
        document.getElementById('negativeText').value = '';
    }
});
