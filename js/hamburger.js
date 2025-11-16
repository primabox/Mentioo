const toggleBtn = document.getElementById('navbar-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener('click', () => {
    // Toggle common variants so pages using different CSS conventions work:
    // - generic pages: `.mobile-menu.active`
    // - alternate naming: `.mobile-menu.mobile-active`
    // - checkout-prefixed pages: `.co-mobile-menu.co-active`
    // - cart-prefixed pages: `.cart-mobile-menu.cart-active`
    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('mobile-active');
    mobileMenu.classList.toggle('co-active');
    mobileMenu.classList.toggle('co-mobile-active');
    mobileMenu.classList.toggle('cart-active');
    mobileMenu.classList.toggle('cart-mobile-active');
    // Profile-prefixed mobile menu - only toggle the active state (do NOT remove base pf-mobile-menu)
    mobileMenu.classList.toggle('pf-active');

    // Toggle a visual state on the button itself (some pages use button active classes)
    toggleBtn.classList.toggle('active');
    toggleBtn.classList.toggle('co-active');
    toggleBtn.classList.toggle('cart-active');

    // Profile-prefixed variant: toggle active state only (do NOT remove base pf-hamburger-btn)
    toggleBtn.classList.toggle('pf-active');

    document.body.classList.toggle('mobile-menu-open');
    // Profile-prefixed body state (some pages use this)
    document.body.classList.toggle('pf-mobile-menu-open');

    // Also toggle profile navbar menu active state if present
    const navbarMenu = document.getElementById('navbar-menu');
    if (navbarMenu) {
      navbarMenu.classList.toggle('pf-active');
      navbarMenu.classList.toggle('active');
    }
  });
}

export {};

