import { paginationBtns } from './create_page_btn';

export default function finalPageBtn(page) {
  let btns = [
    '<li><button class="pagination-btn " href="#" type="button" btn-pagination>1</button></li>',
    '...',
  ];
  for (let i = 0; i < 5; i += 1) {
    if (i === 0) {
      btns.push(
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${
          page - 4
        }</button></li>`
      );
    } else if (i === 1) {
      btns.push(
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${
          page - 3
        }</button></li>`
      );
    } else if (i === 2) {
      btns.push(
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${
          page - 2
        }</button></li>`
      );
    } else if (i === 3) {
      btns.push(
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${
          page - 1
        }</button></li>`
      );
    } else if (i === 4) {
      btns.push(
        `<li><button class="pagination-btn  " href="#" type="button" btn-pagination>${page}</button></li>`
      );
    }
  }

  paginationBtns.innerHTML = btns.join('');
}
