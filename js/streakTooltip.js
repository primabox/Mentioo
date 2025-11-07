document.addEventListener('DOMContentLoaded', function() {
    const streakInfoBtn = document.querySelector('.streak-info-btn');
    const streakTooltip = document.querySelector('.streak-tooltip');
    
    if (streakInfoBtn && streakTooltip) {
        streakInfoBtn.addEventListener('mouseenter', function() {
            streakTooltip.classList.add('visible');
        });
        
        streakInfoBtn.addEventListener('mouseleave', function() {
            streakTooltip.classList.remove('visible');
        });
    }
});
