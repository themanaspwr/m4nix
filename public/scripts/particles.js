const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const count = 45;               // Number of particles
const speed = 0.15;             // Movement speed
const fadeSpeed = 0.0025;       // Fade in/out speed

const colors = [
  "rgba(255,99,132,0.35)",   // pink
  "rgba(54,162,235,0.35)",   // blue
  "rgba(255,206,86,0.35)",   // yellow
  "rgba(75,192,192,0.35)",   // teal
  "rgba(153,102,255,0.35)",  // purple
  "rgba(255,159,64,0.35)"    // orange
];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Create particles
for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random(),
    fadeDir: Math.random() > 0.5 ? 1 : -1
  });
}

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += (Math.random() - 0.5) * speed;
    p.y += (Math.random() - 0.5) * speed;

    p.alpha += fadeSpeed * p.fadeDir;
    if (p.alpha <= 0.05 || p.alpha >= 0.35) p.fadeDir *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace("0.35", p.alpha.toFixed(2));
    ctx.fill();

    // Respawn if out of screen
    if (p.x < -50 || p.x > canvas.width + 50 ||
        p.y < -50 || p.y > canvas.height + 50) {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
    }
  });

  requestAnimationFrame(animate);
}

animate();
