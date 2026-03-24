(() => {
  const root = document;
  const cartDrawer = root.querySelector('[data-cart-drawer]');

  root.querySelector('[data-cart-open]')?.addEventListener('click', () => {
    cartDrawer?.removeAttribute('hidden');
  });

  root.querySelector('[data-cart-close]')?.addEventListener('click', () => {
    cartDrawer?.setAttribute('hidden', 'hidden');
  });

  root.querySelector('[data-search-open]')?.addEventListener('click', () => {
    root.querySelector('predictive-search')?.toggleAttribute('hidden');
  });
})();
