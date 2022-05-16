import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

let lightBoxInstance;

galleryRef.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

galleryRef.addEventListener('click', onPreviewClick);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

function onPreviewClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  modalOpen(evt.target.dataset.source);
}

function modalOpen(originalImageUrl) {
  lightBoxInstance = basicLightbox.create(`
    <img src="${originalImageUrl}">
`);

  lightBoxInstance.show(instance => window.addEventListener('keydown', onEscPress));
}

function onEscPress(evt) {
  if (evt.code === 'Escape') {
    modalClose();
  }
}

function modalClose() {
  lightBoxInstance.close(() => window.removeEventListener('keydown', onEscPress));
}
