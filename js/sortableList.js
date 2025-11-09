// Sortable List functionality for test7 with touch support
document.addEventListener('DOMContentLoaded', () => {
  const sortableList = document.getElementById('sortable-list');
  
  if (!sortableList) return;
  
  let draggedElement = null;
  let placeholder = null;
  let isDragging = false;
  let startY = 0;
  let dragOffset = { x: 0, y: 0 };
  
  // Create placeholder element
  const createPlaceholder = () => {
    const div = document.createElement('div');
    div.className = 'sortable-placeholder';
    return div;
  };
  
  // Get Y coordinate from mouse or touch event
  const getClientY = (e) => {
    return e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  };
  
  // Get closest sortable item that is not dragged or placeholder
  const getClosestValidItem = (clientY) => {
    const items = Array.from(sortableList.children).filter(child => 
      child.classList.contains('sortable-item') && 
      child !== draggedElement && 
      !child.classList.contains('sortable-placeholder')
    );
    
    let closestItem = null;
    let closestDistance = Infinity;
    let insertBefore = true;
    
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(clientY - itemCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
        insertBefore = clientY < itemCenter;
      }
    });
    
    return { item: closestItem, insertBefore };
  };
  
  // Handle drag/touch movement
  const handleMove = (clientY) => {
    if (!draggedElement || !placeholder) return;
    
    const result = getClosestValidItem(clientY);
    
    if (result.item) {
      if (result.insertBefore) {
        result.item.parentNode.insertBefore(placeholder, result.item);
      } else {
        result.item.parentNode.insertBefore(placeholder, result.item.nextSibling);
      }
    }
  };
  
  // Add event listeners to container and items
  const attachEventListeners = () => {
    const items = sortableList.querySelectorAll('.sortable-item');
    
    items.forEach(item => {
      // Desktop drag events
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      
      // Touch events
      item.addEventListener('touchstart', handleTouchStart, { passive: false });
      item.addEventListener('touchmove', handleTouchMove, { passive: false });
      item.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    // Desktop drag events on container
    sortableList.addEventListener('dragover', handleDragOver);
    sortableList.addEventListener('drop', handleDrop);
  };
  
  // Desktop drag handlers
  const handleDragStart = (e) => {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    
    placeholder = createPlaceholder();
    
    setTimeout(() => {
      e.target.style.display = 'none';
      e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
    }, 0);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };
  
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    e.target.style.display = 'flex';
    
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
    
    draggedElement = null;
    placeholder = null;
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    handleMove(e.clientY);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (draggedElement && placeholder && placeholder.parentNode) {
      placeholder.parentNode.insertBefore(draggedElement, placeholder);
    }
  };
  
  // Touch handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    
    const touch = e.touches[0];
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    
    draggedElement = item;
    startY = touch.clientY;
    dragOffset.x = touch.clientX - rect.left;
    dragOffset.y = touch.clientY - rect.top;
    isDragging = true;
    
    item.classList.add('dragging');
    placeholder = createPlaceholder();
    
    // Insert placeholder after the dragged item
    item.parentNode.insertBefore(placeholder, item.nextSibling);
    
    // Position the dragged item absolutely for visual feedback
    item.style.position = 'fixed';
    item.style.left = (touch.clientX - dragOffset.x) + 'px';
    item.style.top = (touch.clientY - dragOffset.y) + 'px';
    item.style.zIndex = '1000';
    item.style.pointerEvents = 'none';
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !draggedElement) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    
    // Update dragged element position
    draggedElement.style.left = (touch.clientX - dragOffset.x) + 'px';
    draggedElement.style.top = (touch.clientY - dragOffset.y) + 'px';
    
    // Handle placeholder positioning
    handleMove(touch.clientY);
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging || !draggedElement) return;
    
    e.preventDefault();
    isDragging = false;
    
    // Reset dragged element styles
    draggedElement.style.position = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';
    draggedElement.style.zIndex = '';
    draggedElement.style.pointerEvents = '';
    draggedElement.classList.remove('dragging');
    
    // Insert dragged element at placeholder position
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.insertBefore(draggedElement, placeholder);
      placeholder.parentNode.removeChild(placeholder);
    }
    
    draggedElement = null;
    placeholder = null;
  };
  
  // Initialize event listeners
  attachEventListeners();
});