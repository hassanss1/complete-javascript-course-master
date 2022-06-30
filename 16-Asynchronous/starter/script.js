'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = country => {
//   // Old-school XMLHttpRequest way
//   const request = new XMLHttpRequest();

//   // public-apis on github CORS need to be yes to access it from our own code
//   // API ENDPOINTS (url that we need)
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   // to send off the request to fetch data on the request
//   request.send();

//   request.addEventListener('load', function () {
//     // as soon as the load finished and data arrives this function runs
//     const [data] = JSON.parse(this.responseText);

//     const html = `
//           <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.country}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

const renderCountry = (data, className = '') => {
  const html = `
          <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderErr = message => {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};
// // AJAX call country 1
// const getCountryAndNeighbour = country => {
//   // Old-school XMLHttpRequest way
//   const request = new XMLHttpRequest();

//   // public-apis on github CORS need to be yes to access it from our own code
//   // API ENDPOINTS (url that we need)
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   // to send off the request to fetch data on the request
//   request.send();

//   request.addEventListener('load', function () {
//     // as soon as the load finished and data arrives this function runs
//     const [data] = JSON.parse(this.responseText);

//     // Render Country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// const getCountryData = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v2/alpha/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) return;

//       // country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     // this .catch method will catch any errors that occur in the promise chain
//     .catch(err => {
//       console.error(`${err}`);
//       renderErr(`Something went wrong ${err.message}. Try again!`);
//     })
//     // finally will be called always no matter if fulfilled or rejected
//     .finally(() => {
//       // for example to hide a loading spinner
//       // in our case to unhide the container
//       countriesContainer.style.opacity = 1;
//     });
// };
// getCountryData('portugal');

// Encapsulating fetch and response handler

const getJSON = (url, errorMsg = 'Something went wrong') => {
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error(`No neighbour found!`);

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/name/${country}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// Coding challange #1
// https://geocode.xyz/51.50354,-0.12768?geoit=json
const whereAmI = function (lat, lng) {
  // getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`, 'Country not found')
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message}`))
    .finally((countriesContainer.style.opacity = 1));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
