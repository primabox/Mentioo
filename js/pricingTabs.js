document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.plan-tab');
  const tabsContainer = document.querySelector('.plan-tabs');

  if (!tabsContainer || !tabs || tabs.length === 0) return;

  // -------- Slider pod taby --------
  function updateSlider(tab) {
    if (!tab) return;
    const span = tab.querySelector('span') || tab;
    let spanRect = span.getBoundingClientRect();
    let containerRect = tabsContainer.getBoundingClientRect();

    if ((!spanRect || !spanRect.width) && span.offsetWidth) {
      spanRect = { left: span.offsetLeft, width: span.offsetWidth };
      containerRect = { left: tabsContainer.offsetLeft, width: tabsContainer.offsetWidth };
    }

    const spanLeftRel = Math.round(spanRect.left - containerRect.left);
    const spanRightRel = spanLeftRel + Math.round(spanRect.width);

    const defaultOffset = 16;
    const defaultStartOffset = -12;

    const tabMode = tab.dataset.extend || tabsContainer.dataset.extend || '';
    const rightOffset = parseInt(tabsContainer.dataset.rightOffset || defaultOffset, 10);
    const leftOffset = parseInt(tabsContainer.dataset.leftOffset || defaultOffset, 10);
    const startOffset = parseInt(tab.dataset.startOffset ?? tabsContainer.dataset.startOffset ?? defaultStartOffset, 10);

    let left = spanLeftRel + startOffset;
    let width = Math.round(spanRect.width - startOffset);

    if (tabMode === 'right') {
      left = spanLeftRel + startOffset;
      width = Math.round(containerRect.width - spanLeftRel - startOffset + rightOffset);
      if (width < spanRect.width) width = Math.round(spanRect.width);
    } else if (tabMode === 'left') {
      left = -leftOffset;
      width = Math.round(spanRightRel + leftOffset - startOffset);
      if (width < spanRect.width) width = Math.round(spanRect.width);
    } else {
      left = spanLeftRel + startOffset;
      width = Math.round(spanRect.width - startOffset);
    }

    tabsContainer.style.setProperty('--bar-left', `${left}px`);
    tabsContainer.style.setProperty('--bar-width', `${width}px`);
  }

  // -------- Price parsing & update --------
  const priceItems = [];

  function parsePrices() {
    const pricePs = document.querySelectorAll('.pricing-card p');
    priceItems.length = 0;
    pricePs.forEach(p => {
      const numberEl = p.querySelector('.price-number');
      const unitEl = p.querySelector('.price-unit');
      if (!numberEl || !unitEl) return;

      const numText = numberEl.textContent.replace(/\s+/g, '').replace(',', '.');
      const value = parseFloat(numText);
      if (Number.isNaN(value)) return;

      let baseMonthly = value;
      if (unitEl.textContent.toLowerCase().includes('rok')) baseMonthly = value / 12;

      priceItems.push({ el: p, numberEl, unitEl, baseMonthly });
    });
  }

  function formatPrice(n) {
    return Math.round(n).toLocaleString('cs-CZ');
  }

  function animateNumber(el, start, end, duration = 1000) {
    const startTime = performance.now();
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = start + (end - start) * progress;
      el.textContent = formatPrice(value) + ' Kč ';
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function updatePrices(mode) {
    priceItems.forEach(item => {
      const { numberEl, unitEl, baseMonthly } = item;
      let newValue, newUnit;

      if (mode === 'annual' || mode === 'year' || mode === 'roční' || mode === 'rok') {
        newValue = baseMonthly * 12;
        newUnit = '| Rok';
      } else {
        newValue = baseMonthly;
        newUnit = '| Měsíc';
      }

      // fade out
      numberEl.classList.add('fade-out');
      unitEl.classList.add('fade-out');

      setTimeout(() => {
        const oldValue = parseFloat(numberEl.textContent.replace(/\D/g, '')) || 0;
        animateNumber(numberEl, oldValue, newValue);

        unitEl.textContent = newUnit;

        // fade in
        numberEl.classList.remove('fade-out');
        unitEl.classList.remove('fade-out');
        numberEl.classList.add('fade-in');
        unitEl.classList.add('fade-in');

        setTimeout(() => {
          numberEl.classList.remove('fade-in');
          unitEl.classList.remove('fade-in');
        }, 300);
      }, 150);
    });
  }

  // -------- Initialization --------
  const init = () => {
    const activeTab = document.querySelector('.plan-tab.active') || tabs[0];
    updateSlider(activeTab);
    parsePrices();
    const activeMode = activeTab ? (activeTab.dataset.tab || 'monthly') : 'monthly';
    updatePrices(activeMode);
  };

  setTimeout(() => requestAnimationFrame(init), 50);

  // -------- Tab click --------
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateSlider(tab);
      const mode = tab.dataset.tab || 'monthly';
      updatePrices(mode);
    });
  });

  // -------- Window resize --------
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const active = document.querySelector('.plan-tab.active') || tabs[0];
      updateSlider(active);
    }, 100);
  });
});
