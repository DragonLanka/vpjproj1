const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

   window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
    }, 1000);  // 5 seconds delay
});

        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse tracking
        let mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };

        // Particle system
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.life = Math.random() * 0.5 + 0.5;
                this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`; // Cool colors
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 0.01;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let particles = [];
        
        function animate() {
            ctx.fillStyle = 'rgba(10, 25, 41, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Create particles at mouse position
            if (Math.random() < 0.3) {
                particles.push(new Particle(mouse.x, mouse.y));
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }

        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Track touch movement
        window.addEventListener('touchmove', (e) => {
            e.preventDefault();
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }, { passive: false });

        // Start animation
        animate();
		