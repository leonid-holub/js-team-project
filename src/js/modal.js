import { FetchService } from './base_fetch';

const refs = {
  gallery: document.querySelector('.cards__list'),
  cards: document.querySelectorAll('.cards__link'),
  openModalBtns: document.querySelectorAll('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  modalWindow: document.querySelector('.modal'),
};

refs.closeModalBtn.addEventListener('click', closeModalBtn);
export function closeModalBtn() {
  refs.modal.classList.add('is-hidden');
}

refs.modal.addEventListener('click', closeModalBack);
function closeModalBack(ev) {
  if (ev.target === refs.modal) {
    refs.modal.classList.add('is-hidden');
  } else {
    return;
  }
}

refs.gallery.addEventListener('click', openModal);

function openModal(ev) {
  const cards = document.querySelectorAll('.cards__link');

  cards.forEach(card => card.addEventListener('click', onCardModalOpen));

  function onCardModalOpen(ev) {
    refs.modal.classList.remove('is-hidden');
  }

  /////////////////////////////////////////
  // console.log(ev.target.textContent);

  //   const fetchInfo = new FetchService();
  //   fetchInfo.config.params.id = ev.target.textContent;

  //   addInfo();

  //   function addInfo() {
  //     fetchInfo.baseFetch().then(response => {
  //       console.log(response);
  //       // getStartPageMarkup(response);
  //     });
  //   }
}

window.addEventListener('keydown', closeModalKey);
function closeModalKey(ev) {
  if (ev.code === 'Escape') {
    refs.modal.classList.add('is-hidden');
  }
}
