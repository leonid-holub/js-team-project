import createPageBtn from '../js/create_page_btn';
import { paginationBtns } from '../js/create_page_btn';
import updatePageBtn from '../js/update_page_btn';
import endPageBtn from '../js/end_page_btn';
const paginationMenu = document.querySelector('[data-pagination]');
export let totalPages = 25;
export let btnTarget;
createPageBtn(totalPages);
paginationMenu.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  chooseCreateBtn(e.target);
}
function chooseCreateBtn(elem) {
  if (
    Number(elem.textContent) >= 4 &&
    Number(elem.textContent) < totalPages - 3
  ) {
    return updatePageBtn(Number(elem.textContent));
  } else if (Number(elem.textContent) === 1 || Number(elem.textContent) === 3) {
    return createPageBtn(totalPages);
  } else if (
    Number(elem.textContent) < 4 ||
    Number(elem.textContent) > totalPages - 3
  ) {
    return;
  } else if (Number(elem.textContent) === totalPages - 3) {
    return endPageBtn(Number(elem.textContent));
  }
}
