'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();

  // We need a unique identifier because we will have an array of these objects
  // Usually we never create on our own, we let some library take care of that
  id = (Date.now() + '').slice(-10);

  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //array [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  _setDescription() {
    // prettier-ignore
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // in minutes/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling'
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // in km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([32, -19], 5.2, 24, 178);
// const cycling1 = new Cycling([32, -19], 27, 10, 523);

////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  // create empty workouts array to be used later
  #workouts = [];

  constructor() {
    // once the new App object is created, the constructor is called, so we get position here
    // Get user's position
    this._getPosition();

    // Get data from local storage (if there is any logic is inside it)
    this._getLocalStorage();

    // Attach event handlers
    //  It is necessary to add event listeners in the constructor because we want them to be listened from the beginning, not
    // just when a function is called

    // for when the form is submitted, create new workout
    form.addEventListener('submit', this._newWorkout.bind(this));

    // for when the workout type is changed, change from/to elevation/cadence
    inputType.addEventListener('change', this._toggleElevationField);

    // for when the user clicks in one workout
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      // from navigator __proto__ we have this navigator.geolocation method

      navigator.geolocation.getCurrentPosition(
        // this function has 2 arguments of callback functions, the first is the coordinates to be loaded,
        // the second is if it does not work
        // we have to bind with the this keyword to reference to the object calling it
        // Then we call the function to load the map parsing the geolocation of the user
        this._loadMap.bind(this),
        function () {
          alert(
            'Could not get your location! Please check your internet connection or if you are allowing the page to access your location.'
          );
        }
      );
    }
  }
  _loadMap(position) {
    // navigator.geolocation returns a huge object with many props, we get coords from it
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // assemble coords into one variable
    const coords = [latitude, longitude];

    //   assing map with those coords (comes from the map API LeafLet)
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    // setting props of the map to the #map variable
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //   handling clicks on map (because only the API would be able to proper listen inside the map)
    this.#map.on('click', this._showForm.bind(this));

    // This was in setLocalStorage but it won't work because the map is not yet loaded.
    // so I added this here to call the method when the map has been loaded.
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }
  _showForm(mapE) {
    // we grab from _loadMap method the this keyword - note, we are already listening to form submition even when hidden
    this.#mapEvent = mapE;
    // showing up form again
    form.classList.remove('hidden');

    // If there is already an object, open form with its attributes
    if (mapE.id) {
      mapE.inputDistance.textContent = mapE.distance;
      mapE.inputDuration.textContent = mapE.duration;
      mapE.inputCadence
        ? (mapE.inputCadence.textContent = mapE.cadence)
        : (mapE.inputElevation.textContent = mapE.elevation);
      mapE.inputType.textContent = mapE.type;
    }

    // for good UI focus on distance input field
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    // Helper functions to validate data before creating workouts
    // first to see if the input is not a number
    // tip: the ...rest creates an array to be interated with
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    // second to check if they are all positive numbers
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value; // '+' is converting to number
    const duration = +inputDuration.value;
    // the mapEvent contain the workout element or the
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //   cadence and elevation we will do with logical operator later to validate data

    // if workout running, then create running obj
    if (type === `running`) {
      const cadence = +inputCadence.value;
      // each should be a number (create helper function to check valid numbers)
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!'); // guard clause, if any value is not a number

      // if there is no previous obj, create new one with new id
      if (!this.#mapEvent.id)
        workout = new Running([lat, lng], distance, duration, cadence);

      // if there is a previous obj,
      if (this.#mapEvent.id) {
        // grab workout as #mapEvent
        workout = this.#mapEvent;
        workout.distance = distance;
        workout.duration = duration;
        workout.cadence = cadence;
      }
    }

    // if workout cycling, then create cycling obj
    if (type === `cycling`) {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!'); // guard clause, if any value is not a number

      // if there is no previous obj, create new one with new id
      if (!this.#mapEvent.id)
        workout = new Cycling([lat, lng], distance, duration, elevation);
      // if there is a previous obj,
      if (this.#mapEvent.id) {
        // grab workout as #mapEvent
        workout = this.#mapEvent;
        workout.distance = distance;
        workout.duration = duration;
        workout.elevation = elevation;
      }
    }

    // Add new object to the workout array if there is no previous object
    if (!this.#mapEvent.id) this.#workouts.push(workout);

    // If there is object, find the one with the same and id and replace with updated workout
    this.#workouts.find(work => work.id === this.#mapEvent.id) = workout;

    // render workout on map as a marker
    this._renderWorkoutMarker(workout);

    // Render workout on the list as item entered
    this._renderWorkout(workout);
    // hide the form

    // Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    //   Insert html whenever there is a new workout
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">Running on April 14</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
      `;
    if (workout.type === 'running')
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
        </div>
    </li>
    `;
    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li> -->
    `;
    form.insertAdjacentHTML('afterend', html);
  }
  _hideForm() {
    // Empty the input
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _moveToPopup(e) {
    //   Guard clause to ignore clicks without workout element
    const workoutEl = e.target.closest('.workout');
    // If there is no workout, return
    if (!workoutEl) return;

    // send clicked workout to 'workout' variable by using its id
    const workout = this.#workouts.find(
      // this will find one object inside the workouts array that has the same id
      // the dataset of the clicked obj has many keys, we then grab the id
      work => work.id === workoutEl.dataset.id
    );

    // For editing objects we need to open their form with all values they contain
    this._showForm(workout);
    // but just when the form is submitted
    form.addEventListener('submit', _newWorkout.bind(this));

    // then we set the view of the #map object using workout coordinates, and passing view options found in the API website
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 0.3,
      },
    });
    // using the public interface
    // workout.click();
  }
  _setLocalStorage() {
    // localStorage is an API that the browser provides us
    // we should not use it to store big amounts of data because it slows down the app
    localStorage.setItem(
      'workouts',
      // This is to turn an object into a string
      // WE WILL LOSE PROTOTYPE CHAIN!
      JSON.stringify(this.#workouts)
    );
  }
  _getLocalStorage() {
    // JSON.parse is to make string an object
    // WE WILL LOSE PROTOTYPE CHAIN!
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      this._renderWorkoutMarker(work);
    });
  }
  reset() {
    localStorage.removeItem('workouts');
    // to reload the page
    location.reload();
  }
}

const app = new App();
