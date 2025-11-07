// Password Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const passwordToggles = document.querySelectorAll('.password-toggle');

  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const eyeShow = toggle.querySelector('.eye-show');
      const eyeHide = toggle.querySelector('.eye-hide');

      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeShow.style.display = 'none';
        eyeHide.style.display = 'block';
      } else {
        passwordInput.type = 'password';
        eyeShow.style.display = 'block';
        eyeHide.style.display = 'none';
      }
    });
  });
});
