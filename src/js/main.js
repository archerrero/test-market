import items from './items';
import Cart from './cart';

import { 
  createItem,
  createCount,
  createPagination,
} from './creaters';

const cartWrapper = document.querySelector('.aside-cart');
const cart = new Cart();
const productList = document.querySelector('.item-list');
const paginationList = document.querySelector('.pagination--list');
const itemsPerPage = 15;
let page = 1;

if (window.location.search) {
  page = Number(window.location.search.replace('?page=',''))
}

function addToCart(id, element) {
  cart.add(id)
  let count = cart.getCartItemById(id).count;
  let counter = document.querySelector(`.js_item_count_${id}`);
  if(counter) counter.innerHTML = createCount(id, count);
  cartWrapper.innerHTML = cart.createCartItems();
}

function deleteFromCart(index, id) {
  let counter = document.querySelector(`.js_item_count_${id}`);
  cart.delete(id);
  if(counter) counter.innerHTML = createCount(id, 0);
  cartWrapper.innerHTML = cart.createCartItems();
}

function initItems({
  page = 1,
  itemsPerPage = 15,
}) {
  let limitMax = itemsPerPage * page;
  let limitMin = limitMax - itemsPerPage;
  
  let res = '';

  items.forEach((item, i) => {
    if (!(i < limitMin || i >= limitMax)) {
      res += createItem({ ...item });
    }
  })
  productList.innerHTML = res;
}

function sortBy(sortedBy) {
  let val = (sortedBy == 'available' ? -1 : 1);

  items.sort((a, b) => {    
    if (a[sortedBy] > b[sortedBy]) return val;
    if (a[sortedBy] < b[sortedBy]) return -val;
    return 0;
  })

  initItems({page: 1, itemsPerPage});
}

initItems({page, itemsPerPage});

paginationList.innerHTML = createPagination({
  itemsLength: 3000,
  itemsPerPage: 15,
  page 
});

cartWrapper.innerHTML = cart.createCartItems();

window.addToCart = addToCart;
window.deleteFromCart = deleteFromCart;
window.sortBy = sortBy;

export { addToCart }