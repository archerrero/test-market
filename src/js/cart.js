import { 
  saveToStorage,
  getFromStorage,
  getItemById
} from './helpers';

import items from './items';

class Cart {

  constructor() {
    this.storageName = 'cart';
    this.cartData = getFromStorage(this.storageName) || Array();

    console.log(this.cartData)
  }

  add(id) {
    //add to cart
    if (!getItemById(id, this.cartData)) {
      this.cartData.push({
        id,
        count: 1,
      })
    } else {
      this.cartData.forEach(item => {
        if(id == item.id) {
          item.count++;
        }
      })
    }

    this.save();
  };

  save() {
    saveToStorage(this.storageName, this.cartData);
  };

  getCartItemById(id) {
    return getItemById(id, this.cartData);
  }

  createCartItems(node) {
    let res = '<ul class="cart-list">';
    let totalPrice = 0;

    this.cartData.forEach((cartItem, i) => {      
      let { image, title, price, available } = getItemById(cartItem.id, items)

      totalPrice += available ? price * cartItem.count : 0;
      
      res += `
      <li class="cart-list--i ${available ? '' : 'unaviable'}">
        <img src="${image}" alt="${title}" class="cart-list--img">
        <div class="cart-list--img">
          <p>${title}</p>
          <p>${price} рублей</p>
        </div>
        <p>x${cartItem.count}</p>
        <button 
          onclick="deleteFromCart(${i})">
          ×
        </button>
      </li>
      `;
    })
    res += '</ul>';
    res += `<div>Итого  ${totalPrice} рублей</div>`;
    return res;
  }

  delete(index) {
    console.log(index)
    this.cartData.splice(index, 1); 
    this.save();
  }
} 

export default Cart;