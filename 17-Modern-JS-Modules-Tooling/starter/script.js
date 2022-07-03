// Importing module
// import { addToCart, totalPrice as price, quantities } from './shoppingCart';

// addToCart(`bread`, 5);
// console.log(price, totalQuantity);
// console.log('Importing module');

// Import everything from a module
// look pretty similar as classes, but it is not to substitute tem
// a module exports kind of a public API because everything else stays private inside the model

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.tota);

// Usually never mix named and default exports in the same module
// but we can do it and it would look like
// import add from './shoppingCart.js';
// add('pizza', 2);

// showin top-level await
// This blocks the execution of the entire module
// // can be useful in some situations but can also be very harmful
// console.log('Start fetching data');
// const res = await fetch(`'https://jsonplaceholder.typicode.com/posts'`);
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch(`'https://jsonplaceholder.typicode.com/posts'`);
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};
const lastPost = getLastPost();

// not very clean...
lastPost.then(last => console.log(last));

// use top-level await instead
const lastPost2 = await getLastPost();
console.log(lastPost2);
