(() => {
  const title = document.getElementById('hero-title');
  const fullName = title?.querySelector('.name-static')?.textContent.trim();
  if (!fullName) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const letters = Array.from(fullName);
  const display = document.createElement('span');
  const text = document.createElement('span');
  display.className = 'name-typing';
  display.setAttribute('aria-hidden', 'true');
  text.className = 'name-typing-text';
  display.append(text);
  title.append(display);

  let timer;
  let visible = true;
  let count = letters.length;
  let deleting = true;

  function tick() {
    display.classList.add('is-typing');
    count += deleting ? -1 : 1;
    text.textContent = letters.slice(0, count).join('');

    if (count === 0) {
      deleting = false;
      timer = setTimeout(tick, 200);
    } else if (count === letters.length) {
      deleting = true;
      display.classList.remove('is-typing');
      timer = setTimeout(tick, 4600);
    } else {
      timer = setTimeout(tick, deleting ? 38 : 87);
    }
  }

  function update() {
    clearTimeout(timer);
    count = letters.length;
    deleting = true;
    text.textContent = fullName;
    display.classList.remove('is-typing');
    const shouldAnimate = visible && !document.hidden && !reducedMotion.matches;
    display.hidden = !shouldAnimate;
    title.classList.toggle('name-animating', shouldAnimate);
    if (shouldAnimate) timer = setTimeout(tick, 4600);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (visible === entry.isIntersecting) return;
      visible = entry.isIntersecting;
      update();
    }).observe(title);
  }

  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
})();
