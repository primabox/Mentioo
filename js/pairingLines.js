// Pairing Lines - Drawing connections between paired options
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.pairing-container');
    if (!container) return;

    const columns = container.querySelectorAll('.pairing-column');
    if (columns.length !== 2) return;

    const leftColumn = columns[0];
    const rightColumn = columns[1];

    // Create SVG element for drawing lines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';

    container.style.position = 'relative';
    container.insertBefore(svg, container.firstChild);

    // Get pairing boxes
    const leftBoxes = Array.from(leftColumn.querySelectorAll('.pairing-box'));
    const rightBoxes = Array.from(rightColumn.querySelectorAll('.pairing-box'));

    // Define pairings based on data-pair attribute
    const pairings = [];

    leftBoxes.forEach((leftBox, leftIndex) => {
        const leftPairId = leftBox.getAttribute('data-pair');
        if (!leftPairId) return;

        rightBoxes.forEach((rightBox, rightIndex) => {
            const rightPairId = rightBox.getAttribute('data-pair');

            // Match based on same data-pair value
            if (leftPairId === rightPairId) {
                pairings.push({
                    left: leftIndex,
                    right: rightIndex
                });
            }
        });
    });

    // Function to draw lines
    function drawLines() {
        // Clear existing lines
        svg.innerHTML = '';

        const containerRect = container.getBoundingClientRect();

        pairings.forEach(pair => {
            const leftBox = leftBoxes[pair.left];
            const rightBox = rightBoxes[pair.right];

            if (!leftBox || !rightBox) return;

            const leftRect = leftBox.getBoundingClientRect();
            const rightRect = rightBox.getBoundingClientRect();

            // Calculate gap between columns
            const gapSize = rightRect.left - leftRect.right;
            const gapOffset = gapSize * 0.15; // Start/end 15% into the gap

            // Calculate positions relative to container - positioned in the gap
            const x1 = leftRect.right - containerRect.left + gapOffset;
            const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
            const x2 = rightRect.left - containerRect.left - gapOffset;
            const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

            // Check if boxes have data-incorrect attribute
            const isIncorrect = leftBox.hasAttribute('data-incorrect') ||
                rightBox.hasAttribute('data-incorrect');

            // Create curved line
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            let d;
            if (isIncorrect) {
                // Asymmetric S-curve for incorrect pairs
                const distance = x2 - x1;
                const heightDiff = y2 - y1;
                const midY = (y1 + y2) / 2;

                // Control points create asymmetric S shape
                // First control point: 40% horizontally, slightly pulled toward middle vertically
                const cp1x = x1 + distance * 0.4;
                const cp1y = y1 + heightDiff * 0.3;

                // Second control point: 70% horizontally, slightly pulled toward middle vertically  
                const cp2x = x1 + distance * 0.7;
                const cp2y = y2 - heightDiff * 0.2;

                d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
            } else {
                // Standard curve for correct pairs
                const midX = (x1 + x2) / 2;
                d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
            }

            path.setAttribute('d', d);
            path.setAttribute('stroke', isIncorrect ? '#DF632D' : '#00AC7C');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.6');

            svg.appendChild(path);
        });
    }

    // Draw lines on load and resize
    drawLines();
    window.addEventListener('resize', drawLines);
});
