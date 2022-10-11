import { totalPages } from '../js/pagination';
import { paginationBtns } from '../js/create_page_btn';
import { btnTarget } from '../js/pagination';
export default function updatePageBtn(page) {
  let btns = [
    '<li><button class="pagination-btn " href="#" type="button" btn-pagination>1</button></li>',
    '...',
  ];
  for (let i = 0; i < 3; i += 1) {
    if (i === 0) {
      btns.push(
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${
          page - 1
        }</button></li>`
      );
    } else if (i === 1) {
      btns.push(
        `<li><button class="pagination-btn  " href="#" type="button" btn-pagination>${page}</button></li>`
      );
    } else if (i === 2) {
      btns.push(
        `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${
          page + 1
        }</button></li>`
      );
    }
  }

  btns.push(
    '...',
    `<li><button class="pagination-btn " href="#" type="button" btn-pagination>${totalPages}</button></li>`
  );

  paginationBtns.innerHTML = btns.join('');
}
