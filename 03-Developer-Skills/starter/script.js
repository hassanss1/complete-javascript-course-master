// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// Code challange #1 - Dev Skills & Editor Setup

// Return string with given temperatures [17, 21, 23] will print "... 17oC in 1 days ... 21oC in 2 days ... 23oC in 3 days ..."
const array = [17, 21, 23];
console.log(`... ${array[0]}°C `);
// Create a function that takes an array and log each value in a string
function printForecast(array) {
  // It has to add to the print a piece of message for each value + position of value as 'day'
  let forecastMessage = ``;
  for (let i = 0; i < array.length; i++) {
    // if (array[i] !== "number") continue;
    // how to append something to a string? concatenation
    forecastMessage = forecastMessage + `...${array[i]}°C in ${i + 1} days`;
  }
  console.log(forecastMessage);
}
console.log(printForecast(array));
