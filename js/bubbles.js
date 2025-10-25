document.addEventListener('DOMContentLoaded', () => {
  const fields = document.querySelectorAll('.bubble-field');
  if (!fields.length) return;

  fields.forEach(field => {
    const bubbles = Array.from(field.querySelectorAll('.bubble')).map(el => {
      const amp = parseFloat(el.dataset.amp) || (12 + Math.random() * 18);
      const speed = parseFloat(el.dataset.speed) || (0.4 + Math.random() * 0.8);
      const parallax = parseFloat(el.dataset.parallax) || (5 + Math.random() * 10);
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;
      el.style.willChange = 'transform';
      return { el, amp, speed, parallax, phaseX, phaseY };
    });

    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    let rect = field.getBoundingClientRect();

    function onMouseMove(e) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetMouse.x = ((e.clientX - cx) / (rect.width / 2));
      targetMouse.y = ((e.clientY - cy) / (rect.height / 2));
      targetMouse.x = Math.max(-1, Math.min(1, targetMouse.x));
      targetMouse.y = Math.max(-1, Math.min(1, targetMouse.y));
    }

    function onResize() { rect = field.getBoundingClientRect(); }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', e => {
      if (!e.touches?.[0]) return;
      onMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }, { passive: true });
    window.addEventListener('resize', onResize);

    let t0 = performance.now();
    function loop(now) {
      const dt = (now - t0) / 1000;
      t0 = now;

      // plynulé přiblížení k cílové pozici myši
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      bubbles.forEach(b => {
        b.phaseX += b.speed * dt;
        b.phaseY += (b.speed * 0.9) * dt;

        const driftX = Math.sin(b.phaseX) * b.amp;
        const driftY = Math.cos(b.phaseY) * b.amp;

        // 🩵 jemnější inverzní vertikální efekt
        const invPx = -mouse.x * b.parallax;
        const invPy = -mouse.y * b.parallax * 0.6; // 👈 0.4 = snížená citlivost pohybu nahoru/dolu

        const dx = driftX + invPx;
        const dy = driftY + invPy;

        b.el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });
});