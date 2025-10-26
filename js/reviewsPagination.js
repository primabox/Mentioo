// Reviews pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewsPerPage = 6;
    const reviewCards = document.querySelectorAll('.review-card');
    const paginationContainer = document.querySelector('.reviews-pagination');
    const paginationNumbers = paginationContainer.querySelectorAll('.pagination-number');
    const prevButton = paginationContainer.querySelector('.pagination-prev');
    const nextButton = paginationContainer.querySelector('.pagination-next');
    const totalPages = Math.ceil(reviewCards.length / reviewsPerPage);
    let currentPage = 1;

    // Function to show reviews for current page
    function showPage(page) {
        const start = (page - 1) * reviewsPerPage;
        const end = start + reviewsPerPage;

        reviewCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        updatePaginationUI(page);
    }

    // Function to update pagination UI
    function updatePaginationUI(page) {
        currentPage = page;

        // Update number buttons
        paginationNumbers.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === page) {
                btn.classList.add('active');
            }
        });

        // Update prev/next buttons state
        if (page === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if (page === totalPages) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
    }

    // Add click handlers to pagination numbers
    paginationNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageNum = parseInt(this.textContent);
            showPage(pageNum);
            
            // Scroll to reviews section
            document.querySelector('.reviews-header').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Previous button
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
            document.querySelector('.reviews-header').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Next button
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
            document.querySelector('.reviews-header').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Initialize - show first page
    showPage(1);
});
