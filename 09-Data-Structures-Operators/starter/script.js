'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// // const restaurant = {
// //   name: 'Classico Italiano',
// //   location: 'Via Angelo Tavanti 23, Firenze, Italy',
// //   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
// //   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// //   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

// //   openingHours: {
// //     thu: {
// //       open: 12,
// //       close: 22,
// //     },
// //     fri: {
// //       open: 11,
// //       close: 23,
// //     },
// //     sat: {
// //       open: 0, // Open 24 hours
// //       close: 24,
// //     },
// //   },
// // };
// // const { openingHours } = restaurant;
// // console.log(openingHours);

// // const { fri } = openingHours;
// // console.log(fri);

// // Coding challange description:
// // Your tasks:

// // 7. Theteamwiththeloweroddismorelikelytowin.Printtotheconsolewhich team is more likely to win, without
// // using an if/else statement or the ternary operator.

// // Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
// // Data for the coding challange
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1. Createoneplayerarrayforeachteam(variables'players1'and 'players2')
// const [players1, players2] = game.players;
// // console.log(players1, players2);

// // 2. Thefirstplayerinanyplayerarrayisthegoalkeeperandtheothersarefield players.
// // For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
// // and one array ('fieldPlayers')
// // with all the remaining 10 field players
// const [gk, ...fieldPlayers] = players1;
// // console.log(gk, fieldPlayers);

// // 3. Createanarray'allPlayers'containingallplayersofbothteams(22 players)
// const allPlayers = [...players1, ...players2];
// // console.log(allPlayers);

// // 4. Duringthegame,BayernMunich(team1)used3substituteplayers.Socreatea new array ('players1Final')
// // containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// // console.log(players1Final);

// // 5. Basedonthegame.oddsobject,createonevariableforeachodd(called 'team1', 'draw' and 'team2')
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// // console.log(team1, draw, team2);

// // 6. Writeafunction('printGoals')thatreceivesanarbitrarynumberofplayer names (not an array) and prints
// // each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// const printGoals = function (...players) {
//   // print number of goals
//   // console.log(`${players.length} goals scored!`);
//   // iterate through element given
//   //   for (const [i, player] of game.scored.entries())
//   //     console.log(`Goal ${i + 1}: ${player}`);
//   // };
//   // For calling the function with the array inside the object game
//   // we have to spread it first, because otherwise it will parse an Array
//   // to the function and it would only return [Array1()] as result of the function
//   printGoals(...game.scored);
// };
// // For the odds we need to use the Logical Assignment Operators with short circuiting
// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');

// // 1. Loopoverthegame.scoredarrayandprinteachplayernametotheconsole, along with the goal number (Example: "Goal 1: Lewandowski")
// for (const [x, player] of game.scored.entries()) {
//   // console.log(`Goal ${x + 1}: ${player}`);
// }
// // 2. Usealooptocalculatetheaverageoddandlogittotheconsole(Wealready studied how to calculate averages, you can go check if you don't remember)
// // sum the total of the values and then divide it by three
// console.log(game.odds);
// const odds = Object.values(game.odds);
// let average = 0;
// for (const odd of odds) {
//   average += odd;
//   console.log(odd);
// }
// console.log(`${average / odds.length}`);

// // Printthe3oddstotheconsole,butinaniceformattedway,exactlylikethis:
// // Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
// // Odd of victory Borrussia Dortmund: 6.5
// // Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names ????
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }

// // Bonus:Createanobjectcalled'scorers'whichcontainsthenamesofthe players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// //      {
// //        Gnarby: 1,
// //        Hummels: 1,
// //        Lewandowski: 2
// // }
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// const gameEvents = new Map([
//   [17, '??? GOAL'],
//   [36, '???? Substitution'],
//   [47, '??? GOAL'],
//   [61, '???? Substitution'],
//   [64, '???? Yellow card'],
//   [69, ' ???? Red card'],
//   [70, '???? Substitution'],
//   [72, '???? Substitution'],
//   [76, '??? GOAL'],
//   [80, '??? GOAL'],
//   [92, '???? Yellow card'],
// ]);
// //          1. Getting unique events
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// //          2. Remove event on minute 64
// gameEvents.delete(64);
// console.log(gameEvents);

// //          3. Average events / 90 min
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );
// //          4. Loopover'gameEvents'andlogeachelementtotheconsole,marking whether it's in the first half or second half (after 45 min) of the game, like this:
// // [FIRST HALF] 17: ???   GOAL
// for (const [key, value] of gameEvents) {
//   const min = key <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${min} HALF] ${key}: ${value}`);
// }

// CODING CHALLANGE 4 - Data Structures, Modern Operators and Strings

// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
//   Some_Variable
//  calculate_AGE
//  delayed_departure
document.body.append(document.createElement('textarea'));

document.body.append(document.createElement('button'));

function toCamelCase() {
  const inputVariable = document.querySelector('textarea').value;
  // Convert string into array while splitting
  const inputArray = inputVariable.toLowerCase().split('\n');

  inputArray.forEach(function (variable, index) {
    const [firstWord, secondWord] = variable.trim().split('_');
    const secondWordFixed = secondWord[0].toUpperCase() + secondWord.slice(1);
    const output = `${firstWord}${secondWord.replace(
      secondWord[0],
      secondWord[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)} ${'???'.repeat(index + 1)}`);
  });
  // or I could use for (const [index, row] of inputArray)
  // Read what is written from user with .toLowerCase().trim()
}
// Listen when button is clicked and read textarea
document.querySelector('button').addEventListener('click', toCamelCase);
// Split in _
// Replace first letter second word with .toUpperCase()
// Join with ''
// Display each new word

4002 5700
03 02