import createPageBtn from '../js/create_page_btn';
import finalPageBtn from '../js/final_page_btn';
import updatePageBtn from '../js/update_page_btn';
import endPageBtn from '../js/end_page_btn';
import paginationFetch from './pagination_fetch';
const paginationMenu = document.querySelector('[data-pagination]');
let pageBtns = document.querySelectorAll('[btn-pagination]');

export let totalPages = 0;
export let btnValue = 0;

export function getTotal(total) {
  totalPages = total;
  createPageBtn(totalPages);
  pageBtns = document.querySelectorAll('[btn-pagination]');
  console.log(pageBtns);
  pageBtns[0].classList.add('is-active');
  paginationMenu.addEventListener('click', onBtnClick);
}

function onBtnClick(e) {
  e.preventDefault();
  btnValue = Number(e.target.textContent);
  paginationFetch(btnValue);
  if (!e.target.hasAttribute('btn-pagination')) {
    return;
  }
  removeIsActive();
  if (pageBtns.length <= 4) {
    return addIsActive();
  } else {
    chooseCreateBtn(e.target);
    return addIsActive();
  }
}

function chooseCreateBtn(elem) {
  if (
    Number(elem.textContent) >= 4 &&
    Number(elem.textContent) < totalPages - 3
  ) {
    return updatePageBtn(Number(elem.textContent));
  } else if (Number(elem.textContent) === 1 || Number(elem.textContent) === 3) {
    return createPageBtn(totalPages);
  } else if (Number(elem.textContent) === totalPages - 3) {
    return endPageBtn(Number(elem.textContent));
  } else if (Number(elem.textContent) === totalPages) {
    return finalPageBtn(elem.textContent);
  } else if (
    Number(elem.textContent) < 4 ||
    Number(elem.textContent) > totalPages - 3
  ) {
    return;
  }
}

function addIsActive() {
  pageBtns = document.querySelectorAll('[btn-pagination]');

  for (let i = 0; i <= pageBtns.length; i += 1) {
    if (btnValue === Number(pageBtns[i].textContent)) {
      return pageBtns[i].classList.add('is-active');
    }
  }
}
function removeIsActive() {
  pageBtns = document.querySelectorAll('[btn-pagination]');
  for (let i = 0; i <= pageBtns.length; i += 1) {
    if (pageBtns[i].classList.contains('is-active')) {
      return pageBtns[i].classList.remove('is-active');
    }
  }
}
