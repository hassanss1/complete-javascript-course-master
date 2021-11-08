'use strict';

function calcTip(bill) {
    const tip = bill >= 50 && bill <= 300 ? bill*0.15 : bill*0.2
    return tip
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [bills[0]+tips[0], bills[1]+tips[1],bills[bills.length-1]+tips[tips.length-1]]
console.log(tips);
console.log(total);