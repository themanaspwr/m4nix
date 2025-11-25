// Auto-scroll Testimonials
const track = document.querySelector('.carousel-track');
let position = 0;

setInterval(() => {
  position -= 1;
  if (Math.abs(position) >= track.scrollWidth / 2) position = 0;
  track.style.transform = `translateX(${position}px)`;
}, 20);

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
