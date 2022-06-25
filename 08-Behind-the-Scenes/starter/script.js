'use strict';

const hassan = {
  year: 1994,
  calcAge: function () {
    console.log(this);
    console.log(2021 - this.year);
  },
};

hassan.calcAge();

const sarah = {
  year: 1995,
};
sarah.calcAge = hassan.calcAge;
sarah.calcAge();
