// Test Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('test-modal');
  const startBtn = document.querySelector('.test-start-btn');
  const closeBtn = document.querySelector('.test-modal-close');
  const backBtn = document.querySelector('.test-modal-btn-back');
  const continueBtn = document.querySelector('.test-modal-btn-start');
  const overlay = document.querySelector('.test-modal-overlay');

  // Open modal
  if (startBtn) {
    startBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal functions
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (backBtn) {
    backBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // Continue to test
  if (continueBtn) {
    continueBtn.addEventListener('click', function() {
      // Here you can add navigation to the actual test page
      console.log('Starting test...');
      closeModal();
      // Example: window.location.href = 'test-questions.html';
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
