document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const PARTICLE_COUNT = 45;
  const MOVE_SPEED = 0.25;
  const FADE_SPEED = 0.0025;

  const COLORS = [
    "255,99,132",   // pink
    "54,162,235",   // blue
    "255,206,86",   // yellow
    "75,192,192",   // teal
    "153,102,255",  // purple
    "255,159,64"    // orange
  ];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)].split(",");
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 4,
      vx: (Math.random() - 0.5) * MOVE_SPEED,
      vy: (Math.random() - 0.5) * MOVE_SPEED,
      alpha: Math.random() * 0.3 + 0.1,
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      r, g, b
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // move
      p.x += p.vx;
      p.y += p.vy;

      // bounce off viewport edges
      if (p.x < -20 || p.x > canvas.width + 20) p.vx *= -1;
      if (p.y < -20 || p.y > canvas.height + 20) p.vy *= -1;

      // fade in/out
      p.alpha += FADE_SPEED * p.fadeDir;
      if (p.alpha <= 0.05 || p.alpha >= 0.4) p.fadeDir *= -1;

      // draw smooth glowing circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
      ctx.shadowBlur = 16;
      ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
});
