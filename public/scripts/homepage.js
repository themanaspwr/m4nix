// =========================
// TESTIMONIALS CAROUSEL
// =========================

const track = document.querySelector('.carousel-track');
let position = 0;
let speed = 0.6;
let isPaused = false;

// Auto scroll
function animateCarousel() {
  if (!isPaused) {
    position -= speed;
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(animateCarousel);
}
requestAnimationFrame(animateCarousel);

// Hover pause
track.addEventListener("mouseover", () => isPaused = true);
track.addEventListener("mouseleave", () => isPaused = false);

// Touch drag
let startX = 0;
track.addEventListener("touchstart", (e) => {
  isPaused = true;
  startX = e.touches[0].clientX;
});
track.addEventListener("touchmove", (e) => {
  const delta = e.touches[0].clientX - startX;
  position += delta;
  startX = e.touches[0].clientX;
});
track.addEventListener("touchend", () => isPaused = false);

// =========================
// MODAL LOGIC
// =========================

const modal = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalPreview = document.querySelector(".modal-preview");

document.querySelectorAll(".modal-trigger").forEach(card => {
  card.addEventListener("click", () => {
    modal.classList.add("show");

    // NEW FAKE PREVIEW UI
    modalPreview.innerHTML = `
      <div class="fake-preview">
        <div class="preview-bar"></div>
        <div class="preview-line short"></div>
        <div class="preview-line"></div>
        <div class="preview-line"></div>
      </div>
    `;
  });
});

modalClose.onclick = () => modal.classList.remove("show");
modal.onclick = (e) => { if (e.target === modal) modal.classList.remove("show"); };

// =============================
// AI PARTICLES (Hero Background)
// =============================
const canvas = document.getElementById("aiParticles");
const ctx = canvas.getContext("2d");

function resizeParticles() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeParticles();
window.addEventListener("resize", resizeParticles);

// Generate particles
const particles = [];
const particleCount = 24;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360}, 75%, 70%)`,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 18;
    ctx.shadowColor = p.color;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();
