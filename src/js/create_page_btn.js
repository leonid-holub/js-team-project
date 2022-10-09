export const paginationBtns = document.querySelector('[data-pagination]');
export default function createPageBtn(value) {
  const quantityBtn = [];
  let pageBtns = [];
  for (let i = 1; i <= value; i += 1) {
    quantityBtn.push(i);
  }
  if (value < 5) {
    pageBtns = quantityBtn.map(
      btn =>
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${btn}</button></li>`
    );
  } else if (value > 5) {
    pageBtns = quantityBtn.map(btn => {
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
  }

  return (paginationBtns.innerHTML = pageBtns.join(''));
}
