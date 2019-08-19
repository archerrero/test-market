
import { 
  declOfNum
} from './helpers';
import Cart from './cart';

const cart = new Cart();

function createItem({
  id = 1,
  title = 'Стул 1',
  image = 'https://d37kg2ecsrm74.cloudfront.net/web/ikea4/images/382/0238233_PE377690_S5.jpg',
  descr = 'Супер стул',
  price = 300,
  available = true,
}) {
  let cartItem = cart.getCartItemById(id);
  let count = cartItem ? cartItem.count : null;

  return `
    <li class="item-list--i">
      <img src="${image}" alt="${title}" class="item-list--i--image">
      <div class="item-list--i--info-wrapper">
        <h3 class="item-list--i--header">${title}</h3>
        <p class="item-list--i--price">${price} рублей</p>
        <p class="item-list--i--decs">${descr}</p>
      </div>
      <div 
        class="item-list--i--order-wrapper">
        <button 
          onclick="addToCart(${id}, this)"
          class="item-list--i--button"
          ${!available ? 'disabled' : ''}>
          ${available ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
        <div class="item-list--i--ordered-count js_item_count_${id}">
          ${createCount(id, count)}
        </div>
      </div>
    </li>
  `;
}

function createCount(id, count) {
  return count ? `
  <p class="item-list--i--ordered-count">
    Добавлено ${count} ${declOfNum(count, ['товар', 'товара', 'товаров'])}
  </p>` : '';
}

function createPagination({
  itemsLength = 3000,
  itemsPerPage = 15,
  page = 1,
}) {
  let pages = itemsLength / itemsPerPage;
  let res = `
  <li class="pagination--list--i">
    <a href="?page=1"  class="pagination--button">
      <
    </a>
  </li>`; 

  for (let index = 0; index < pages; index++) {
    if (!(index > page - 5 && index < page + 5)) continue
    res += `
    <li class="pagination--list--i">
      <a href="?page=${index + 1}"  class="pagination--button">
        ${index + 1}
      </a>
    </li>`; 
  }
  res += `
  <li class="pagination--list--i">
    <a href="?page=${pages}"  class="pagination--button">
      >
    </a>
  </li>`; 
  return res;
}

export { 
  createItem,
  createCount,
  createPagination
}