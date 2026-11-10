(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  canvas.className = 'star-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);

  const stars = [];
  const lifetime = 620;
  const maxStars = 36;
  let frame = 0;
  let lastEmission = -Infinity;
  let width = 0;
  let height = 0;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(now) {
    context.clearRect(0, 0, width, height);
    for (let i = stars.length - 1; i >= 0; i--) {
      const star = stars[i];
      const age = (now - star.born) / lifetime;
      if (age >= 1) {
        stars.splice(i, 1);
        continue;
      }

      const x = star.x + star.dx * age;
      const y = star.y + star.dy * age;
      const size = star.size * (1 - age * .45);
      context.globalAlpha = (1 - age) * .72;
      context.fillStyle = star.color;
      context.beginPath();
      context.moveTo(x, y - size);
      context.lineTo(x + size * .28, y - size * .28);
      context.lineTo(x + size, y);
      context.lineTo(x + size * .28, y + size * .28);
      context.lineTo(x, y + size);
      context.lineTo(x - size * .28, y + size * .28);
      context.lineTo(x - size, y);
      context.lineTo(x - size * .28, y - size * .28);
      context.closePath();
      context.fill();
    }
    frame = stars.length ? requestAnimationFrame(draw) : 0;
  }

  function emit(x, y) {
    if (reducedMotion.matches || document.hidden) return;
    const now = performance.now();
    if (now - lastEmission < 32) return;
    lastEmission = now;

    for (let i = 0; i < 2; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 9 + Math.random() * 13;
      stars.push({
        x: x + Math.cos(angle) * radius,
        y: y + Math.sin(angle) * radius,
        dx: Math.cos(angle) * 20,
        dy: Math.sin(angle) * 20 - 8,
        size: 2.5 + Math.random() * 3,
        color: i === 0 ? '#a5382c' : '#bb714b',
        born: now,
      });
    }
    if (stars.length > maxStars) stars.splice(0, stars.length - maxStars);
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function clear() {
    cancelAnimationFrame(frame);
    frame = 0;
    stars.length = 0;
    context.clearRect(0, 0, width, height);
  }

  function onTouch(event) {
    const touch = event.touches[0];
    if (touch) emit(touch.clientX, touch.clientY);
  }

  addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch') emit(event.clientX, event.clientY);
  }, { passive: true });
  addEventListener('touchstart', onTouch, { passive: true });
  addEventListener('touchmove', onTouch, { passive: true });
  addEventListener('resize', resize, { passive: true });
  reducedMotion.addEventListener('change', () => {
    clear();
    resize();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clear();
  });
  resize();
})();
