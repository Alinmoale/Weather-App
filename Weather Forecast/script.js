const currentTemp = document.querySelector("#temperature");
const weatherForecastEl = document.querySelector("#weather-forecast");
const otherInfo = document.querySelector(".other-info");
const second = document.querySelector(".second-row");
let newName = document.querySelector("#cityInput");
let cityName = document.querySelector("#location");
const API_key = "49cc8c821cd2aff9af04c9f98c36eb74";
const daily = document.querySelector(".weather-forecast-item");
const third = document.querySelector(".third-row");

function Getlocation() {
  fetch("https://ipinfo.io/json?token=49a7c85bdb01f8")
    .then((response) => response.json())
    .then((data) => {
      let place = data.city;
      GetInfo(place);
    });
}
Getlocation();
function GetInfo(place) {
  newName.defaultValue = place;
  cityName.innerHTML = newName.value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${newName.value}&limit=5&appid=${API_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data[0]) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        getWeatherData(lat, lon);
      }
    });
}
GetInfo();

function getWeatherData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${API_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showWeatherData(data);
    });
}
function showWeatherData(data) {
  let iconNow = data.current.weather[0].icon;
  let { wind_speed, humidity, feels_like, temp } = data.current;
  let sky = data.current.weather[0].description;

  Uppercasesky = sky.charAt(0).toUpperCase() + sky.slice(1);
  third.innerHTML = `<div class="sky-view" id="sky-view">${Uppercasesky}</div>`;
  otherInfo.innerHTML = `
  <p class="wind" id="wind">Wind <br class="break"> ${wind_speed} km/h</p>
  <p class="humidity" id="humidity">Humidity <br class="break"> ${humidity}%</p>
  <p class="feels-like" id="feels-like">Feels like<br class="break"> ${feels_like} &#8451</p>
  `;
  second.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${iconNow}@2x.png" alt="weather icon" class="w-icon">
            <div class="temperature" id="temperature">${temp} &#8451;</div>
  `;
  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
    } else {
      otherDayForecast += ` <div class="weather-forecast-item" >
         <div class="day">${window
           .moment(day.dt * 1000)
           .format("dddd")
           .substr(0, 3)} </div>
        <img src="https://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night-${day.temp.night} &#8451</div>
        <div class="temp">Day-${day.temp.day} &#8451</div>
      </div>
  `;
    }
  });
  weatherForecastEl.innerHTML = otherDayForecast;
}
