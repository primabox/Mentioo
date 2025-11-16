// Curriculum accordion with smooth animation — tolerant of de- prefixed classes
const moduleHeaders = document.querySelectorAll('.module-header, .de-module-header');

moduleHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // Find the module container (support both prefixed and unprefixed)
    const module = header.closest('.curriculum-module') || header.closest('.de-curriculum-module') || header.parentElement;

    if (!module) return;

    const content = module.querySelector('.module-content, .de-module-content');
    const toggle = header.querySelector('.module-toggle, .de-module-toggle') || module.querySelector('.module-toggle, .de-module-toggle');

    if (!content) return;

    const isOpen = content.classList.contains('open') || content.classList.contains('de-open');

    // Toggle classes (keep both variants to be robust during migration)
    if (isOpen) {
      content.classList.remove('open');
      content.classList.remove('de-open');
      // collapse smooth: clear maxHeight so CSS can transition if defined
      content.style.maxHeight = null;
      if (toggle && toggle.style) toggle.style.transform = 'rotate(0deg)';
    } else {
      content.classList.add('open');
      content.classList.add('de-open');
      // expand smooth: set maxHeight to scrollHeight for transition
      try {
        content.style.maxHeight = content.scrollHeight + 'px';
      } catch (e) {
        // ignore if not measurable
      }
      if (toggle && toggle.style) toggle.style.transform = 'rotate(180deg)';
    }
  });
});