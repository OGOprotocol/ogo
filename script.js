const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    draw() {
        ctx.fillStyle = '#bb74ba';
        ctx.strokeStyle = '#bb74ba';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }
}

function init() {
    particlesArray = [];
    for(let i = 0; i < 100; i++) {
        particlesArray.push(new Particle(
            Math.random() * canvas.width, 
            Math.random() * canvas.height
        ));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();

        if(particlesArray[i].size <= 0.2){
            particlesArray.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);
    if(particlesArray.length < 100){
        particlesArray.push(new Particle(
            Math.random() * canvas.width, 
            Math.random() * canvas.height
        ));
    }
}

init();
animateParticles();
