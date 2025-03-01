// ===================== Hiệu ứng Fade-in =====================
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach((element) => observer.observe(element));
});

// CSS cho hiệu ứng Fade-in
const fadeInStyle = document.createElement("style");
fadeInStyle.textContent = `
    .fade-in { animation: fadeIn 1s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(fadeInStyle);


// ===================== Hiệu ứng hạt & Line link =====================
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const maxParticles = 100; // Giới hạn hạt
const mouse = { x: null, y: null };

// Resize canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray.length = 0;
    initParticles();
});

// Theo dõi chuột
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Class hạt
class Particle {
    constructor() {
        this.originX = Math.random() * canvas.width;
        this.originY = Math.random() * canvas.height;
        this.x = this.originX;
        this.y = this.originY;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = Math.random() * 150 + 150;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 150, 255, 0.8)";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        // Hạt theo chuột trong phạm vi gần
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
            this.x += dx * 0.03;
            this.y += dy * 0.03;
        } else {
            // Hạt quay về vị trí ban đầu
            this.x += (this.originX - this.x) * 0.009;
            this.y += (this.originY - this.y) * 0.009;
        }

        // Xóa hạt cũ
        if (this.life <= 0) {
            particlesArray.splice(particlesArray.indexOf(this), 1);
        }
    }
}

// Tạo hạt ban đầu
function initParticles() {
    for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Vẽ đường liên kết giữa các hạt
function drawLines() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) { // Giới hạn kết nối xa hơn
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);

                const opacity = 1 - distance / 140;
                ctx.strokeStyle = `rgba(0, 150, 255, ${opacity * 0.6})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particlesArray.length < maxParticles) {
        particlesArray.push(new Particle());
    }

    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
}

// Khởi động
initParticles();
animate();


// ===================== Hiệu ứng Progress Bar =====================
document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach(bar => {
        let percent = bar.getAttribute("data-percent");
        bar.style.width = percent + "%";

        let percentText = bar.closest(".progress-container").querySelector(".percent-text");
        if (percentText) {
            percentText.textContent = percent + "%";
        }
    });
});

// ===================== Hiệu ứng Hire button =====================
function toggleHireStatus() {
    let thoughtBubble = document.getElementById("thoughtBubble");
    
    if (thoughtBubble.style.display === "none" || thoughtBubble.style.display === "") {
        thoughtBubble.style.display = "block";
        thoughtBubble.textContent = "Hired!";
    } else {
        thoughtBubble.style.display = "none";
    }
}
