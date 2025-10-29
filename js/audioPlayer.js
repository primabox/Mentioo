// Audio Player with Speed Control
document.addEventListener('DOMContentLoaded', function () {
    const audioPlayers = document.querySelectorAll('.audio-player');

    audioPlayers.forEach(player => {
        const playBtn = player.querySelector('.audio-play-btn');
        const speedBtn = player.querySelector('.audio-speed');
        const rewindBtn = player.querySelector('.audio-rewind');
        const forwardBtn = player.querySelector('.audio-forward');

        let isPlaying = false;
        let currentSpeed = 1;
        let progressInterval = null;
        let currentProgress = 0;
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

        // Generate waveform bars
        const waveformBars = player.querySelector('.waveform-bars');
        if (waveformBars && !waveformBars.children.length) {
            for (let i = 0; i < 100; i++) {
                const bar = document.createElement('div');
                bar.className = 'waveform-bar';
                const height = Math.random() * 60 + 20; // Random height between 20-80%
                bar.style.height = `${height}%`;
                waveformBars.appendChild(bar);
            }
        }

        // Function to update waveform progress
        function updateWaveformProgress() {
            const bars = waveformBars.querySelectorAll('.waveform-bar');
            const activeCount = Math.floor((currentProgress / 100) * bars.length);

            bars.forEach((bar, index) => {
                if (index < activeCount) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }

        // Function to start progress simulation
        function startProgress() {
            if (progressInterval) clearInterval(progressInterval);

            progressInterval = setInterval(() => {
                currentProgress += (currentSpeed * 0.5); // Adjust speed based on playback speed

                if (currentProgress >= 100) {
                    currentProgress = 100;
                    isPlaying = false;
                    clearInterval(progressInterval);

                    // Reset to play icon when finished
                    const playIcon = playBtn.querySelector('.play-icon');
                    const pauseIcon = playBtn.querySelector('.pause-icon');
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }

                updateWaveformProgress();
            }, 100); // Update every 100ms
        }

        // Function to stop progress
        function stopProgress() {
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
        }

        // Play/Pause toggle
        if (playBtn) {
            playBtn.addEventListener('click', function () {
                isPlaying = !isPlaying;

                // Toggle icons
                const playIcon = playBtn.querySelector('.play-icon');
                const pauseIcon = playBtn.querySelector('.pause-icon');

                if (isPlaying) {
                    // Show pause icon, hide play icon
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    // Start waveform progress
                    startProgress();
                } else {
                    // Show play icon, hide pause icon
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                    // Stop waveform progress
                    stopProgress();
                }
            });
        }

        // Speed control
        if (speedBtn) {
            speedBtn.addEventListener('click', function () {
                const currentIndex = speeds.indexOf(currentSpeed);
                const nextIndex = (currentIndex + 1) % speeds.length;
                currentSpeed = speeds[nextIndex];
                speedBtn.textContent = `${currentSpeed}x`;
            });
        }

        // Rewind button (not implemented - would need actual audio element)
        if (rewindBtn) {
            rewindBtn.addEventListener('click', function () {
                console.log('Rewind 10 seconds');
            });
        }

        // Forward button (not implemented - would need actual audio element)
        if (forwardBtn) {
            forwardBtn.addEventListener('click', function () {
                console.log('Forward 10 seconds');
            });
        }
    });
});
