// function percentageOfWorld1(population) {
//     return (population / 7900) * 100
// }

// let populations = [2323, 1000, 1234, 769];
// console.log(populations.length === 4 ? true : false);
// const percentage = [];
// for ( i = 0; i < populations.length; i++) {
//     percentage.push(percentageOfWorld1(populations[i]))
// };
// console.log(percentage);

// const listOfNeighbours = [
//     ['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']
// ];
// for (i = 0; i < listOfNeighbours.length; i++) {
//     if (listOfNeighbours[i].length === 1) continue;
//     console.log(listOfNeighbours[i]);
//     for (y = 0; y < listOfNeighbours[i].length; y++) {
//         console.log(`Neighbour: ${listOfNeighbours[i][y]}`);
//     }
// }

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];
function calcTip(bill) {
  const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  return tip;
}
for (i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}
function calcAverage(array) {
  let sum = 0;
  for (i = 0; i < array.length; i++) {
    sum += array[i];
  }
  let average = sum / array.length;
  return average;
}
console.log(calcAverage(totals));
