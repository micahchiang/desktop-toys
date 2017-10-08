const colors = [
    '#40CDFF',
    '#2EE8E8',
    '#33FFC6',
    '#335FFF',
    '#A962FF',
    '#BE4DE8',
    '#FF55FF',
    '#694DE8',
    '#5564FF'
];

let canvas;
let context;
let particles;

function initCanvas() {
    let container = document.getElementById('productContainer');
    let canvas = document.getElementById('canvas');
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight;
    return canvas;
}

function initContext() {
    let context = canvas.getContext('2d');
    return context;
}

// Utility Functions
function randomIntFromRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects

function Particle(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.02;
    this.distanceFromCenter = randomIntFromRange(50,120);

    this.update = () => {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        this.radians += this.velocity;
        this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    };

    this.draw = (lastPoint) => {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(lastPoint.x,lastPoint.y);
        context.lineTo(this.x,this.y);
        context.stroke();
        context.closePath();
    }
}

// Implementation
function initParticles() {
    particles = [];
    for(let i = 0; i < 100; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }
}

// animation loop

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255,255,255,0.05)';
    context.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

(() => {
    canvas = initCanvas();
    context = initContext();
    initParticles();
    animate();
})();