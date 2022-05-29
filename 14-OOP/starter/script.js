'use strict';

//
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

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   get convertSpeed() {
//     this.speed = this.speed / 1.6;
//     return console.log(`The car is going at ${this.speed} mi/h`);
//   }

//   set setSpeed(newSpeed) {
//     this.speed = newSpeed * 1.6;
//     console.log(this.speed);
//   }
// }

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// car1.convertSpeed;
// car2.convertSpeed;
// car2.setSpeed = 100;

// const Ev = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// Ev.prototype = Object.create(Car.prototype);
// Ev.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };
// Ev.prototype.accelerate = function () {
//   this.charge--;
//   this.speed += 20;
//   console.log(
//     `${this.make} is going at ${this.speed} with ${this.charge}% of battery`
//   );
// };
// const tesla = new Ev('Tesla', 100, 70);
// console.log(tesla);
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery = 90;
// console.log(tesla);
// tesla.accelerate();

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  accelerate() {
    this.speed += 20;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}
const car1 = new CarCl('BMW', 120);
const car2 = new CarCl('Mercedes', 95);

class EvCl extends CarCl {
  constructor(make, speed, charge) {
    super(make, speed);
    this.charge = charge;
  }

  chargeBattery(changeTo) {
    this.charge = changeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h with ${this.charge}%`
    );
    return this;
  }
}

const car3 = new EvCl('Tesla', 80, 20);
car3.accelerate().brake().accelerate().chargeBattery(90).accelerate();
