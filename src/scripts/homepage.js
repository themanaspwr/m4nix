// =========================
// TESTIMONIALS CAROUSEL
// =========================

const track = document.querySelector('.carousel-track');
let position = 0;
let speed = 0.6; // smooth speed
let isPaused = false;

// Auto scroll
function animateCarousel() {
  if (!isPaused) {
    position -= speed;
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0; // reset for infinite loop
    }
    track.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(animateCarousel);
}
requestAnimationFrame(animateCarousel);

// Pause on hover
track.addEventListener("mouseover", () => isPaused = true);
track.addEventListener("mouseleave", () => isPaused = false);

// Touch-drag support
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

track.addEventListener("touchend", () => {
  isPaused = false;
});

// Modal Logic
const modal = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalPreview = document.querySelector(".modal-preview");

document.querySelectorAll(".modal-trigger").forEach(card => {
  card.addEventListener("click", () => {
    modal.classList.add("show");
    modalPreview.style.background = "linear-gradient(135deg, #dce6ff, #b8c8f3)";
  });
});

modalClose.onclick = () => modal.classList.remove("show");
modal.onclick = (e) => { if (e.target === modal) modal.classList.remove("show"); };
