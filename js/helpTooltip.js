// Prevent help icon clicks from triggering radio button clicks
// and handle tooltip visibility
document.addEventListener('DOMContentLoaded', () => {
  const helpIcons = document.querySelectorAll('.question-help-icon');
  
  helpIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    // Show/hide tooltip on hover
    icon.addEventListener('mouseenter', () => {
      const tooltip = icon.nextElementSibling;
      if (tooltip && tooltip.classList.contains('question-help-tooltip')) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      }
    });

    icon.addEventListener('mouseleave', () => {
      const tooltip = icon.nextElementSibling;
      if (tooltip && tooltip.classList.contains('question-help-tooltip')) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      }
    });
  });
});
