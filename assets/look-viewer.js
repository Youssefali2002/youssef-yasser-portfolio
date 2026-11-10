(() => {
  const viewer = document.querySelector('.look-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;

  const title = viewer.querySelector('h2');
  const media = viewer.querySelector('.look-viewer-media');
  const image = media.querySelector('img');
  const original = viewer.querySelector('footer a');
  const defaultTitle = title.textContent;
  let trigger;

  document.querySelectorAll('a[data-look-image]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      trigger = link;
      image.alt = link.querySelector('img').alt;
      title.textContent = image.alt || defaultTitle;
      image.src = link.href;
      original.href = link.href;
      viewer.showModal();
      media.scrollTop = 0;
    });
  });

  viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });

  viewer.addEventListener('close', () => {
    image.removeAttribute('src');
    trigger?.focus({ preventScroll: true });
    trigger = undefined;
  });
})();
