const refs = {
  openModalBtn: document.querySelector('[data-logform-open]'),
  closeModalBtn: document.querySelector('[data-logform-close]'),
  formModal: document.querySelector('[data-logform]'),
  form: document.querySelector('.logform'),
}

refs.openModalBtn.addEventListener('click', openForm);

function openForm(ev) {
    ev.preventDefault;
    refs.formModal.classList.remove('is-hidden');
}