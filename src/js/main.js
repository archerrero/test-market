import items from './items';
import Cart from './cart';

import { 
  createItem,
  createCount,
} from './creaters';

const cartWrapper = document.querySelector('.aside-cart');
const cart = new Cart();
const productList = document.querySelector('.item-list');
const itemsPerPage = 15;

function addToCart(id, element) {
  cart.add(id)
  let count = cart.getCartItemById(id).count;
  let counter = document.querySelector(`.js_item_count_${id}`);
  counter.innerHTML = createCount(id, count);
  cartWrapper.innerHTML = cart.createCartItems();
}

function deleteFromCart(index) {
  cart.delete(index);
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

initItems({page:1, itemsPerPage});

cartWrapper.innerHTML = cart.createCartItems();

window.addToCart = addToCart;
window.deleteFromCart = deleteFromCart;
export { addToCart }