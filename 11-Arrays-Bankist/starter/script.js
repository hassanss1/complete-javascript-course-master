'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Working with Arrays section
// Coding challenge #1
// Julia and Kate are doing a study on dogs.
//  So each of them asked 5 dog owners about their dog's age,
// and stored the data into an array(one array for each).
// For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
//  and does the following things:
// 1. Juliafoundoutthattheownersofthefirstandthelasttwodogsactuallyhave cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. CreateanarraywithbothJulia's(corrected)andKate'sdata
// 3. Foreachremainingdog,logtotheconsolewhetherit'sanadult("Dognumber1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
// 4. Runthefunctionforbothtestdatasets
// Data 1: Julia's data [3, 5, 2, 12, 7],
// Kate's data [4, 1, 15, 8, 3]
// Data 2: Julia's data[9, 16, 6, 8, 3], Kate's data[10, 5, 6, 1, 4]

// RESOLUTION
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, -2);
//   const allDogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(allDogs);
//   allDogs.forEach(function (dog, index) {
//     dog >= 3
//       ? console.log(
//           `Dog number ${index + 1} is an adult, and is ${dog} years old`
//         )
//       : console.log(`Dog number ${index + 1} is still a puppy 🐶`);
//   });
// };
// checkDogs(dogsJulia, dogsKate);

// Challenge #02
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculatethedogageinhumanyearsusingthefollowingformula:ifthedogis <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Excludealldogsthatarelessthan18humanyearsold(whichisthesameas keeping dogs that are at least 18 years old)
// 3. Calculatetheaveragehumanageofalladultdogs(youshouldalreadyknow from other challenges how we calculate averages 😉)
// 4. Runthefunctionforbothtestdatasets
// Test data:
// § Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages
//     .map(function (dogAge) {
//       return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
//     })
//     .filter(function (humanAge) {
//       return humanAge > 18;
//     });
//   console.log(humanAges);
//   return Math.round(
//     humanAges.reduce((acc, age) => acc + age, 0) / humanAges.length
//   );
// };
// const data = [5, 2, 4, 1, 15, 8, 3, 16, 6, 10, 5, 6, 1, 4];
// console.log(calcAverageHumanAge(data));

// Challenge #03 was done in #02 because I already chained methods

// // Challenge #04
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
// Test data:

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Task 1:
dogs.forEach(dog => (dog.recommendedFood = Math.trunc(dog.weight * 0.75 * 28)));

// Task 2:
// loop over dogs array and read owners to see if it includes 'Sarah'
// console.log(
//   dogs.map(dog =>
//     dog.owners.includes('Sarah')
//       ? dog.curFood > dog.recommendedFood * 0.9 &&
//         dog.curFood < dog.recommendedFood * 1.1
//         ? "Sarah's dog is eating ok"
//         : dog.curFood < dog.recommendedFood
//         ? 'He is eating to little!'
//         : 'He is eating too much!'
//       : "Not Sarah's dog "
//   )
// );
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }.`
);
// Task 3:
// filter dogs that eat more than recommended*1.1
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
// Task 4:
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// Task 5:
// console.log(dogs.some(dog => (dog.curFood === dog.recommendedFood)));
// Task 6:
const isDogsEatingOk = dog => {
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  )
    return true;
  else return false;
};
// Task 7:
const dogsEatingOk = dogs.filter(dog => isDogsEatingOk(dog));
// Task 8:
// create shallow copy of dogs
const dogs2 = dogs.slice();
// sort it by recommended food portion in ascending order
console.log(dogs);
console.log(dogs2.sort((a, b) => a.recommendedFood - b.recommendedFood));
