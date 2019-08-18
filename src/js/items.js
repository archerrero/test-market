const items = Array();
const LIMIT = 3000;

const testItem = {
  id: 1,
  title: 'Стул 1',
  image: 'https://d37kg2ecsrm74.cloudfront.net/web/ikea4/images/382/0238233_PE377690_S5.jpg',
  descr: 'Супер стул',
  price: 300,
  available: true
}

function getRandom(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

for (let index = 0; index < LIMIT; index++) {
  let tempItem = Object.assign({}, testItem, {
    id: index + 1,
    title: `Стул ${index + 1}`,
    price: getRandom(100,1000),
    available: !!getRandom(0,1),
  })
  items.push(tempItem)  
}

export default items