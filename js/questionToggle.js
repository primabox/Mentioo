// Question radio button toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const questionOptions = document.querySelectorAll('.question-option');
  
  questionOptions.forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    
    if (radio) {
      option.addEventListener('click', (e) => {
        // If clicking directly on the radio input, let default behavior handle it first
        if (e.target === radio) {
          // Use setTimeout to check state after default behavior
          setTimeout(() => {
            handleToggle(radio, option);
          }, 0);
        } else {
          // If clicking on the label/option, prevent default and handle manually
          e.preventDefault();
          handleToggle(radio, option);
        }
      });
    }
  });
  
  function handleToggle(radio, option) {
    // Check if this radio was already checked before click
    const wasChecked = option.dataset.wasChecked === 'true';
    
    if (wasChecked) {
      // Toggle off - uncheck the radio
      radio.checked = false;
      option.dataset.wasChecked = 'false';
    } else {
      // Toggle on - check this radio and uncheck others in the same group
      const radioName = radio.name;
      const allRadiosInGroup = document.querySelectorAll(`input[type="radio"][name="${radioName}"]`);
      
      allRadiosInGroup.forEach(r => {
        const parentOption = r.closest('.question-option');
        if (parentOption) {
          parentOption.dataset.wasChecked = 'false';
        }
      });
      
      radio.checked = true;
      option.dataset.wasChecked = 'true';
    }
  }
  
  // Initialize state on page load
  document.querySelectorAll('.question-option input[type="radio"]').forEach(radio => {
    const option = radio.closest('.question-option');
    if (option) {
      option.dataset.wasChecked = radio.checked ? 'true' : 'false';
    }
  });
});
