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
          toggle.style.transform = 'rotate(0deg)';
        } else {
          content.classList.add('open');
          toggle.style.transform = 'rotate(180deg)';
        }
      });
    });