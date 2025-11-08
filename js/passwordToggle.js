// Password Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.querySelector('.password-toggle');
  const toggleIcon = toggleButton ? toggleButton.querySelector('img') : null;

  if (toggleButton && passwordInput && toggleIcon) {
    toggleButton.addEventListener('click', () => {
      // Přepnout typ inputu mezi password a text
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = 'img/visibility_off.png';
        toggleIcon.alt = 'Hide password';
      } else {
        passwordInput.type = 'password';
        toggleIcon.src = 'img/visibility.png';
        toggleIcon.alt = 'Show password';
      }
    });
  }
});
