// Initialize loading screen functionality
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Fade out loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        
        // Remove loading screen after fade
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Initialize canvas background
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Resize canvas when window is resized
window.addEventListener('resize', resizeCanvas);

// Add touch event listeners for mobile
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // Prevent overscroll on mobile devices
    if (diff > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        e.preventDefault();
    }
    if (diff < 0 && window.scrollY <= 0) {
        e.preventDefault();
    }
}, { passive: false });