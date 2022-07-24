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

// const getLastPost = async function () {
//   const res = await fetch(`'https://jsonplaceholder.typicode.com/posts'`);
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
// const lastPost = getLastPost();

// // not very clean...
// lastPost.then(last => console.log(last));

// // use top-level await instead
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// // Module patter implemented
// // usualy write iff immediately invoked function
// // purpose: create new scope and return data just once
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 247;
//   const totalQuantity = 23;
//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity}${product} added to cart`);
//   };
//   const orderStock = function (product, quantity) {
//     console.log(`${quantity}${product} ordered from supplier`);
//   };

//   // To return some of this in order to return a public API
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);

// // Export in node.js part of CommonJS specification
// export.addTocart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// // Import in node.js part of CommonJS specification
// const { addTocart } = require('./shoppingCart.js');

// import cloneDeep from 'lodash-es';

// const state = {
//   cart: [
//     { product: 'bread', quantity: 5 },
//     { product: 'pizza', quantity: 3 },
//   ],
//   user: { loggedIn: true },
// };

// // javascript to copy an object
// const stateClone = Object.assign({}, state);
// // this will also change in state so we use lodash
// const stateDeepClone = cloneDeep(state);

// // but if you change something
// state.user.loggedIn = false;
// console.log(stateClone);

// console.log(stateDeepClone);

const today = new Date();
console.log(`This is today: ${today}`);

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 15);
console.log(tomorrow);
