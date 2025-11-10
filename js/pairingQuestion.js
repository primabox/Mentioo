// Pairing Question Logic
document.addEventListener('DOMContentLoaded', () => {
  const pairingContainer = document.querySelector('.pairing-container');

  if (!pairingContainer) return;

  const pairingBoxes = pairingContainer.querySelectorAll('.pairing-box:not(.pairing-box-disabled)');

  pairingBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const selectedBoxes = pairingContainer.querySelectorAll('.pairing-box-selected');

      // If the clicked box is already selected, deselect it
      if (box.classList.contains('pairing-box-selected')) {
        box.classList.remove('pairing-box-selected');
        return;
      }

      // If already 2 boxes are selected, remove selected from all
      if (selectedBoxes.length >= 2) {
        selectedBoxes.forEach(b => b.classList.remove('pairing-box-selected'));
      }

      // Add selected class to clicked box
      box.classList.add('pairing-box-selected');
    });
  });
});
