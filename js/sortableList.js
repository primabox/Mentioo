// Sortable List functionality - click to swap
document.addEventListener('DOMContentLoaded', () => {
  const sortableList = document.getElementById('sortable-list');
  
  if (!sortableList) return;

  // Detect whether CSS classes are prefixed with 'test-'
  const prefix = document.querySelector('.test-sortable-item') ? 'test-' : '';
  
  let selectedItems = [];
  
  // Handle item click
  const handleItemClick = (e) => {
    const item = e.currentTarget;
    
    const selectedClass = `${prefix}selected`;
    const swappingClass = `${prefix}swapping`;

    // If item is already selected, deselect it
    if (selectedItems.includes(item)) {
      selectedItems = selectedItems.filter(i => i !== item);
      item.classList.remove(selectedClass);
      return;
    }

    // Add to selection
    selectedItems.push(item);
    item.classList.add(selectedClass);
    
    // If 2 items selected, swap them
    if (selectedItems.length === 2) {
      swapItems(selectedItems[0], selectedItems[1]);
      
      // Clear selection
      selectedItems.forEach(i => i.classList.remove(selectedClass));
      selectedItems = [];
    }
  };
  
  // Swap two items
  const swapItems = (item1, item2) => {
    // Add swapping animation class
    const swappingClass = `${prefix}swapping`;
    item1.classList.add(swappingClass);
    item2.classList.add(swappingClass);
    
    setTimeout(() => {
      // Create a temporary placeholder
      const temp = document.createElement('div');
      
      // Get references to next siblings
      const next1 = item1.nextSibling;
      const next2 = item2.nextSibling;
      const parent1 = item1.parentNode;
      const parent2 = item2.parentNode;
      
      // Swap using placeholder
      parent1.insertBefore(temp, item1);
      parent2.insertBefore(item1, next2);
      parent1.insertBefore(item2, next1);
      
      // Remove placeholder
      parent1.removeChild(temp);
      
      // Remove swapping class after animation
      setTimeout(() => {
        item1.classList.remove(swappingClass);
        item2.classList.remove(swappingClass);
      }, 50);
    }, 200);
  };

  // Add event listeners
  const attachEventListeners = () => {
    const items = sortableList.querySelectorAll(`.${prefix}sortable-item`);
    
    items.forEach(item => {
      item.addEventListener('click', handleItemClick);
    });
  };
  
  // Initialize event listeners
  attachEventListeners();
});