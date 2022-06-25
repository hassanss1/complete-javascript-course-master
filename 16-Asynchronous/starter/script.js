'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Old-school XMLHttpRequest way
const request = new XMLHttpRequest();

// public-apis on github CORS need to be yes to access it from our own code
// API ENDPOINTS (url that we need)
request.open('GET', 'https://restcountries.com/v2/name/portugal');
// to send off the request to fetch data on the request
request.send();

request.addEventListener('load', function () {
  // as soon as the load finished and data arrives this function runs
  console.log(this.responseText);
});
