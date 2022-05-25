'use strict';

// //
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car2.brake();
// car2.brake();
// car2.brake();

// car1.brake();

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get convertSpeed() {
    this.speed = this.speed / 1.6;
    return console.log(`The car is going at ${this.speed} mi/h`);
  }

  set setSpeed(newSpeed) {
    this.speed = newSpeed * 1.6;
    console.log(this.speed);
  }
}

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.convertSpeed;
car2.convertSpeed;
car2.setSpeed = 100;
