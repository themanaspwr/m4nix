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

    // Fake preview UI
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

