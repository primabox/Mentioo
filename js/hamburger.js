const toggleBtn = document.getElementById('navbar-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function toggleStateForPrefix(el, basePrefix, stateSuffix = 'active') {
  if (!el) return false;
  if (basePrefix) {
    const baseClass = `${basePrefix}-mobile-menu`;
    const stateClass = `${basePrefix}-${stateSuffix}`;
    if (el.classList.contains(baseClass)) {
      el.classList.toggle(stateClass);
      return true;
    }
  }
  return false;
}

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener('click', () => {
    // Prefer toggling the state class that matches the element's base class.
    // Check known prefixes in priority order and fall back to generic `.mobile-menu.active`.
    const prefixes = ['pf', 'cart', 'co', 'test', 'dc', 'de'];
    let handled = false;
    for (const p of prefixes) {
      if (toggleStateForPrefix(mobileMenu, p)) {
        handled = true;
        break;
      }
    }

    if (!handled) {
      // Generic case: toggle `.active` on elements using `.mobile-menu`
      if (mobileMenu.classList.contains('mobile-menu')) {
        mobileMenu.classList.toggle('active');
      } else {
        // Try some common alternative class names if present
        if (mobileMenu.classList.contains('cart-mobile-menu')) mobileMenu.classList.toggle('cart-active');
        if (mobileMenu.classList.contains('co-mobile-menu')) mobileMenu.classList.toggle('co-active');
        if (mobileMenu.classList.contains('dc-mobile-menu')) mobileMenu.classList.toggle('dc-active');
      }
    }

    // Toggle button visual state matching its prefix
    const btnPrefixes = ['pf', 'cart', 'co', 'test', 'dc', 'de'];
    let btnHandled = false;
    for (const p of btnPrefixes) {
      const baseBtn = `${p}-hamburger-btn`;
      const stateBtn = `${p}-active`;
      if (toggleBtn.classList.contains(baseBtn)) {
        toggleBtn.classList.toggle(stateBtn);
        btnHandled = true;
        break;
      }
    }
    if (!btnHandled) toggleBtn.classList.toggle('active');

    // Body state: prefer a prefixed variant if used, otherwise generic
    let bodyToggled = false;
    for (const p of prefixes) {
      const bodyClass = `${p}-mobile-menu-open`;
      if (document.body.classList.contains(bodyClass)) {
        document.body.classList.toggle(bodyClass);
        bodyToggled = true;
        break;
      }
    }
    if (!bodyToggled) document.body.classList.toggle('mobile-menu-open');

    // Also toggle navbar menu state if present
    const navbarMenu = document.getElementById('navbar-menu');
    if (navbarMenu) {
      // Toggle a prefixed active class if the navbar uses a prefixed base class
      let navToggled = false;
      for (const p of prefixes) {
        const navBase = `${p}-navbar-menu`;
        const navActive = `${p}-active`;
        if (navbarMenu.classList.contains(navBase)) {
          navbarMenu.classList.toggle(navActive);
          navToggled = true;
          break;
        }
      }
      if (!navToggled) navbarMenu.classList.toggle('active');
    }
  });
}

export {};

// Mobile submenu toggles (e.g. 'Nabídka kurzů' -> Programování / Design...)
function initMobileSublinks() {
  const toggles = document.querySelectorAll('.de-mobile-toggle, .dc-mobile-toggle, .mobile-toggle');
  toggles.forEach(btn => {
    // find sibling sublinks container
    const parent = btn.closest('.de-mobile-item') || btn.closest('.dc-mobile-item') || btn.parentElement;
    const sublinks = parent ? parent.querySelector('.de-mobile-sublinks, .dc-mobile-sublinks, .mobile-sublinks') : null;
    if (!sublinks) return;

    // ensure initial aria state
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
    if (!sublinks.hasAttribute('aria-hidden')) sublinks.setAttribute('aria-hidden', 'true');

    btn.addEventListener('click', (e) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        sublinks.setAttribute('aria-hidden', 'true');
        sublinks.style.maxHeight = null;
        sublinks.classList.remove('open');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        sublinks.setAttribute('aria-hidden', 'false');
        sublinks.classList.add('open');
        try { sublinks.style.maxHeight = sublinks.scrollHeight + 'px'; } catch (err) {}
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileSublinks);
} else {
  initMobileSublinks();
}

