export function scrollOnLoading() {
  const { height: cardHeight } = document
    .querySelector('.ImageGallery')
    .firstElementChild.getBoundingClientRect();
  console.log('scroll');
  window.scrollBy({
    top: cardHeight * 3.47,
    behavior: 'smooth',
  });
}
