const valueTotalPrice = document.querySelector('[data-total-price]');
let total = 0;
export function totalPrice(allPrice) {
  for (let i = 0; i < allPrice.length; i += 1) {
    total += Number(allPrice[i].textContent);
    console.log(total);
  }
  valueTotalPrice.textContent = total;
  total = 0;
}
