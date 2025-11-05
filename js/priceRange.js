// Price Range Slider
document.addEventListener('DOMContentLoaded', function () {
    const minSlider = document.getElementById('price-min');
    const maxSlider = document.getElementById('price-max');
    const rangeTrack = document.getElementById('price-slider-range');
    const priceText = document.getElementById('price-range-text');

    if (!minSlider || !maxSlider || !rangeTrack || !priceText) {
        return;
    }

    function formatPrice(value) {
        return new Intl.NumberFormat('cs-CZ').format(value);
    }

    function updateSlider() {
        let minValue = parseInt(minSlider.value);
        let maxValue = parseInt(maxSlider.value);

        // Prevent overlap
        if (minValue > maxValue - 1000) {
            if (this === minSlider) {
                minValue = maxValue - 1000;
                minSlider.value = minValue;
            } else {
                maxValue = minValue + 1000;
                maxSlider.value = maxValue;
            }
        }

        // Update text
        priceText.textContent = `${formatPrice(minValue)} Kč – ${formatPrice(maxValue)} Kč`;

        // Update range track
        const percent1 = (minValue / maxSlider.max) * 100;
        const percent2 = (maxValue / maxSlider.max) * 100;

        rangeTrack.style.left = percent1 + '%';
        rangeTrack.style.width = (percent2 - percent1) + '%';
    }

    minSlider.addEventListener('input', updateSlider);
    maxSlider.addEventListener('input', updateSlider);

    // Initialize
    updateSlider();
});
