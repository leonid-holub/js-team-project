export function smoothScroll() {
  const gallery = document
    .querySelector('.cards__list')
    .getBoundingClientRect();
  const options = {
    top: -gallery.height,
    behavior: 'smooth',
  };
  window.scrollBy(options);
}
