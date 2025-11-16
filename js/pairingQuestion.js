// Pairing Question Logic
document.addEventListener('DOMContentLoaded', () => {
  // Support both prefixed (test-) and unprefixed classnames
  const pairingContainer = document.querySelector('.test-pairing-container, .pairing-container');

  if (!pairingContainer) return;

  // Detect whether the prefixed classes are used on this page
  const prefix = pairingContainer.classList.contains('test-pairing-container') ? 'test-' : '';

  const boxSelector = `.${prefix}pairing-box:not(.${prefix}pairing-box-disabled)`;
  const selectedSelector = `.${prefix}pairing-box-selected`;

  const pairingBoxes = pairingContainer.querySelectorAll(boxSelector);

  pairingBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const selectedBoxes = pairingContainer.querySelectorAll(selectedSelector);

      // If the clicked box is already selected, deselect it
      if (box.classList.contains(`${prefix}pairing-box-selected`)) {
        box.classList.remove(`${prefix}pairing-box-selected`);
        return;
      }

      // If already 2 boxes are selected, remove selected from all
      if (selectedBoxes.length >= 2) {
        selectedBoxes.forEach(b => b.classList.remove(`${prefix}pairing-box-selected`));
      }

      // Add selected class to clicked box
      box.classList.add(`${prefix}pairing-box-selected`);
    });
  });
});
