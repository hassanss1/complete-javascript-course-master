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
import add from './shoppingCart.js';
add('pizza', 2);
