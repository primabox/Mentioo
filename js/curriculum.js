// Curriculum accordion with smooth animation
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const module = header.parentElement;
        const content = module.querySelector('.module-content');
        const toggle = module.querySelector('.module-toggle');
        
        // Toggle open class for smooth animation
        if (content.classList.contains('open')) {
          content.classList.remove('open');
          toggle.classList.remove('fa-chevron-down');
          toggle.classList.add('fa-chevron-right');
          toggle.style.transform = 'rotate(0deg)';
        } else {
          content.classList.add('open');
          toggle.classList.remove('fa-chevron-right');
          toggle.classList.add('fa-chevron-down');
          toggle.style.transform = 'rotate(0deg)';
        }
      });
    });
    
    // Initialize first module as open
    const firstModule = document.querySelector('.curriculum-module .module-content');
    if (firstModule) {
      firstModule.classList.add('open');
    }