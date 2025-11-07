document.addEventListener('DOMContentLoaded', function() {
    const changeAvatarBtn = document.querySelector('.settings-change-avatar-btn');
    const uploadModal = document.getElementById('uploadAvatarModal');
    const closeModalBtn = document.getElementById('closeUploadModal');
    const cancelBtn = document.getElementById('cancelUploadBtn');
    const saveBtn = document.getElementById('saveUploadBtn');
    const overlay = document.querySelector('.upload-avatar-overlay');
    const fileInput = document.getElementById('avatarFileInput');
    const uploadEmpty = document.getElementById('uploadEmpty');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    // Open modal
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            uploadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    uploadEmpty.style.display = 'none';
                    uploadPreview.style.display = 'flex';
                    // Reset position
                    xOffset = 0;
                    yOffset = 0;
                    previewImage.style.transform = 'translate(0px, 0px)';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Draggable image functionality
    if (previewImage) {
        previewImage.addEventListener('mousedown', dragStart);
        previewImage.addEventListener('touchstart', dragStart);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }

    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === previewImage) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, previewImage);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    // Close modal function
    function closeModal() {
        uploadModal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset to initial state
        uploadEmpty.style.display = 'flex';
        uploadPreview.style.display = 'none';
        previewImage.src = '';
        fileInput.value = '';
    }

    // Close modal on X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on Cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Handle save logic here
            const currentSrc = previewImage.src;
            if (currentSrc) {
                // Update the profile avatar
                const profileAvatar = document.querySelector('.settings-avatar');
                if (profileAvatar) {
                    const existingImg = profileAvatar.querySelector('img');
                    if (existingImg) {
                        existingImg.src = currentSrc;
                    } else {
                        const initials = profileAvatar.querySelector('.settings-avatar-initials');
                        if (initials) {
                            initials.remove();
                        }
                        const img = document.createElement('img');
                        img.src = currentSrc;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '50%';
                        profileAvatar.appendChild(img);
                    }
                }
            }
            closeModal();
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && uploadModal.classList.contains('active')) {
            closeModal();
        }
    });
});
