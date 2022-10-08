import { btnTarget } from '../js/pagination';
export const paginationBtns = document.querySelector('[data-pagination]');
export default function createPageBtn(value) {
  const quantityBtn = [];
  for (let i = 1; i <= value; i += 1) {
    quantityBtn.push(i);
  }
  const pageBtns = quantityBtn.map(btn => {
    if (btn > 5) {
      return;
    } else {
      return `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${btn}</button></li>`;
    }
  });
  pageBtns.push(
    '...',
    `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${value}</button></li>`
  );

  return (paginationBtns.innerHTML = pageBtns.join(''));
}
