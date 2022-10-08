(() => {
  const refs = {
    openModalBtns: document.querySelectorAll('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    modalWindow: document.querySelector('.modal'),
  };
    refs.openModalBtns.forEach(btn => btn.addEventListener('click', toggleModal));
    refs.closeModalBtn.addEventListener('click', toggleModal);

    refs.modal.addEventListener('click', closeModalBack);
    function closeModalBack(ev) {
        if (ev.target === refs.modal) {
            refs.modal.classList.add('is-hidden');
        } else {
            return;
        }
    }

    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
    }

    window.addEventListener('keydown', closeModalKey);
    function closeModalKey(ev) {
        if (ev.code === 'Escape') {
            refs.modal.classList.add('is-hidden')
        };
    }
})();