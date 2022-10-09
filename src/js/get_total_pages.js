import { getTotal } from './pagination';
export let total = 0;
export default function getTotalPages(value) {
  total = value;
  getTotal(total);
}
