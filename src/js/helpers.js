function saveToStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

function getFromStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

function getItemById(id, array) {
  let res = null;
  array.forEach(item => {
    if (id == item.id) {
      res = item;
    }
  });
  return res;
}

function declOfNum(number, titles) {  
  let cases = [2, 0, 1, 1, 1, 2];  
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

function getIndexById(id, array) {
  let index = null;
  array.forEach((item, i) => {
    if (id == item.id) {
      index = i;
    }
  });
  return index;
}
export { 
  saveToStorage,
  getFromStorage,
  getItemById,
  declOfNum,
  getIndexById,
}