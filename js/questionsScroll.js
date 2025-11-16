// Questions List Scroll Fade Effect with Drag Functionality
document.addEventListener('DOMContentLoaded', () => {
  const questionsList = document.querySelector('.test-questions-list, .questions-list');
  
  if (!questionsList) return;
  
  let isMouseDown = false;
  let startY = 0;
  let scrollTop = 0;
  
  // Drag functionality
  const handleMouseDown = (e) => {
    isMouseDown = true;
    startY = e.pageY - questionsList.offsetTop;
    scrollTop = questionsList.scrollTop;
    questionsList.classList.add('dragging');
    e.preventDefault();
  };
  
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const y = e.pageY - questionsList.offsetTop;
    const walk = (y - startY) * 2; // Scroll speed multiplier
    questionsList.scrollTop = scrollTop - walk;
  };
  
  const handleMouseUp = () => {
    isMouseDown = false;
    questionsList.classList.remove('dragging');
  };
  
  const handleMouseLeave = () => {
    isMouseDown = false;
    questionsList.classList.remove('dragging');
  };
  
  // Add drag event listeners
  questionsList.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  questionsList.addEventListener('mouseleave', handleMouseLeave);
  
  const updateOpacity = () => {
    const listRect = questionsList.getBoundingClientRect();
    const listCenter = listRect.top + listRect.height / 2;
    const prefix = questionsList.classList.contains('test-questions-list') ? 'test-' : '';
    const questionItems = questionsList.querySelectorAll(`.${prefix}question-item`);
    
    questionItems.forEach((item, index) => {
      // Skip first 5 items (index 0-4)
      if (index < 5) {
        item.style.opacity = 1;
        return;
      }
      
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      
      // Calculate distance from center
      const distance = Math.abs(itemCenter - listCenter);
      const maxDistance = listRect.height / 2;
      
      // Calculate opacity with less aggressive fade (0.5 instead of 0.8)
      let opacity = 1 - (distance / maxDistance) * 0.5;
      opacity = Math.max(0.4, Math.min(1, opacity));
      
      item.style.opacity = opacity;
    });
  };
  
  // Update on scroll (both wheel and drag)
  questionsList.addEventListener('scroll', updateOpacity);
  
  // Initial update
  updateOpacity();
  
  // Update on resize
  window.addEventListener('resize', updateOpacity);
});
