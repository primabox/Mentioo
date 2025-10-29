// Cart Modal Handler
console.log('Cart modal script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up cart modal...');
    
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const modal = document.getElementById('cart-modal');
    const overlay = document.querySelector('.cart-modal-overlay');
    const closeBtn = document.getElementById('cart-modal-close');
    const continueBtn = document.getElementById('cart-btn-continue');
    const checkoutBtn = document.getElementById('cart-btn-checkout');
    const upsellBtns = document.querySelectorAll('.cart-upsell-btn');
    
    console.log('Elements found:', {
        addToCartBtn: !!addToCartBtn,
        modal: !!modal,
        overlay: !!overlay,
        closeBtn: !!closeBtn,
        continueBtn: !!continueBtn,
        checkoutBtn: !!checkoutBtn,
        upsellBtns: upsellBtns.length
    });
    
    // Open modal
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add to cart clicked');
            openCartModal();
        });
    }
    
    function openCartModal() {
        if (modal) {
            // Get scrollbar width before hiding overflow
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            modal.style.display = 'flex';
            
            // Prevent scrolling without layout shift
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            
            // Compensate for scrollbar
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = scrollbarWidth + 'px';
            }
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            
            // Restore scrolling
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Continue shopping
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    // Go to cart
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to cart page
            window.location.href = 'kosik.html'; // Update with your cart page URL
        });
    }
    
    // Upsell buttons
    upsellBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add animation feedback
            this.textContent = 'Přidáno ✓';
            this.style.background = '#10B981';
            this.style.color = 'white';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.textContent = 'Přidat do košíku';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });
});
