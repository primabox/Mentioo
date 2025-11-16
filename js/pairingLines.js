// Pairing Lines - Drawing connections between paired options
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.test-pairing-container, .pairing-container');
    if (!container) return;

    const prefix = container.classList.contains('test-pairing-container') ? 'test-' : '';

    const columns = container.querySelectorAll(`.${prefix}pairing-column`);
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
    const leftBoxes = Array.from(leftColumn.querySelectorAll(`.${prefix}pairing-box`));
    const rightBoxes = Array.from(rightColumn.querySelectorAll(`.${prefix}pairing-box`));

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
            const gapOffset = gapSize * 0.1; // Offset to make lines shorter

            // Calculate positions relative to container - leave space from box edges
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
                // Každá čára má trochu jinou dráhu díky náhodné odchylce
                const dx = x2 - x1;
                const dy = y2 - y1;
                // Náhodná odchylka podle indexu páru (nebo Math.random pro větší variabilitu)
                const seed = (pair.left + 1) * (pair.right + 1);
                function pseudoRandom(seed) {
                    // jednoduchý deterministický "random" pro konzistenci při překreslení
                    return Math.abs(Math.sin(seed * 9301 + 49297) * 233280) % 1;
                }
                const rand = pseudoRandom(seed);
                // Výrazný odklon doleva a větší posun dolů, ale trochu posunuto doprava
                const flatLen = 44 + rand * 16; // 44–60 px
                // Offset X je méně záporný, aby se oblouk stáčel doleva, ale ne extrémně
                const curveOffsetX = -28 + rand * 20; // -28 až -8 px (stále vlevo, ale blíže středu)
                // Y offset je větší, aby spojení šlo více dolů
                const curveOffsetY = 18 + rand * 24; // 18 až 42 px (více dolů)
                // První kontrolní bod je na konci rovného úseku
                const cp1x = x1 + flatLen;
                const cp1y = y1;
                // Druhý kontrolní bod je vlevo a více dolů, ale blíže středu
                const cp2x = x2 - flatLen + curveOffsetX;
                const cp2y = y2 + curveOffsetY;
                d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
            } else {
                const midX = (x1 + x2) / 2;
                d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
            }

            path.setAttribute('d', d);
            path.setAttribute('stroke', isIncorrect ? '#DF632D' : '#009952');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.6');

            svg.appendChild(path);
        });
    }

    // Draw lines on load and resize
    drawLines();
    window.addEventListener('resize', drawLines);
});
