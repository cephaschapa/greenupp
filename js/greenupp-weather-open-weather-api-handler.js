// Greenupp Weather Handler
// Auther: Cephas Chapa

//SELECT ELEMENTS
const iconELement = document.querySelector(".weather-icon");
const tempELement = document.querySelector(".temperature-value p");
const descELement = document.querySelector(".temperature-description p");
const locationELement = document.querySelector(".location p");
const notificationELement = document.querySelector(".notification p");
const feelsLikeElement = document.querySelector(".feels-like p");
const pressureElement = document.querySelector(".pressure p");
const maxTempElement = document.querySelector(".max-temperature p");
const minTempElement = document.querySelector(".min-temperature p");
const humidityElement = document.querySelector(".humidity p");
const sunriseElement = document.querySelector(".sunrise p");
const sunsetElement = document.querySelector(".sunset p");
const windDirectionElement = document.querySelector(".wind-direction p");
const windSpeedElement = document.querySelector(".wind-speed p");
const switchButtonElement = document.querySelector(".switch-temp-btn");
const dateElement = document.querySelector(".date-time");
const latElement = document.querySelector(".lat span");
const lonElement = document.querySelector(".lon span");
const uvIndexElement = document.querySelector(".uv-index p");
// App data

const weather = {};
weather.temperature = {
  unit: "celsius",
};

// App Constants and Variables
const KELVIN = 273;

//API KEY
const key = "2516110a77ef7d9fef9c82eb19b3f4d3";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationELement.style.display = "block";
  notificationELement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW GEO LOCATION ERROR
function showError(error) {
  notificationELement.style.display = "block";
  notificationELement.innerHTML = `<p>${error.message}</p>`;
}

// GET WEATHER
function getWeather(latitude, longitude, cityid) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);

  fetch(api)
    .then(function (response) {
      let data = response.json();
      console.log(data);
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.feels_like = Math.floor(data.main.feels_like - KELVIN);
      weather.min_temp = Math.floor(data.main.temp_min - KELVIN);
      weather.max_temp = Math.floor(data.main.temp_max - KELVIN);
      weather.pressure = data.main.pressure;
      weather.humidity = data.main.humidity;
      weather.windSpeed = Math.floor(data.wind.speed * 3.6);
      weather.windDirection = data.wind.deg;
      weather.lat = data.coord.lat;
      weather.lon = data.coord.lon;
      weather.cityid = data.id;
      weather.vis = data.visibility;
      cityid = data.id;
      console.log(weather.cityid);
      // date = data.dt * 1000;
      const milliseconds1 = data.dt * 1000;
      const dateObj = new Date(milliseconds1);
      weather.dateOfCalc = dateObj.toLocaleTimeString();
      // convert unix to date and time
      const milliseconds = data.sys.sunrise * 1000;
      const dateObject = new Date(milliseconds);
      weather.sunrise = dateObject.toLocaleTimeString();
      //weather.sunrise = time.slice(-11, -4);

      const tomilliseconds = data.sys.sunset * 1000;
      const dateOject2 = new Date(tomilliseconds);
      weather.sunset = dateOject2.toLocaleTimeString();

      if (weather.windDirection > 0 && weather.windDirection < 45) {
        weather.windDirection = "Due NNE";
        return weather.windDirection;
      } else if (weather.windDirection > 45 && weather.windDirection < 90) {
        weather.windDirection = "Due NEE";
        return weather.windDirection;
      } else if (weather.windDirection == 90) {
        weather.windDirection = "Due East";
        return weather.windDirection;
      } else if (weather.windDirection > 90 && weather.windDirection < 135) {
        weather.windDirection = "Due SE";
        return weather.windDirection;
      } else if (weather.windDirection > 135 && weather.windDirection < 180) {
        weather.windDirection = "Due SSE";
        return weather.windDirection;
      } else if (weather.windDirection > 180 && weather.windDirection < 225) {
        weather.windDirection = "Due SSW";
        return weather.windDirection;
      } else if (weather.windDirection > 225 && weather.windDirection < 270) {
        weather.windDirection = "Due SWW";
        return weather.windDirection;
      } else if (weather.windDirection > 270 && weather.windDirection < 315) {
        weather.windDirection = "Due NWW";
        return weather.windDirection;
      } else if (weather.windDirection > 315 && weather.windDirection < 360) {
        weather.windDirection = "Due NW";
        return weather.windDirection;
      }
      return cityid;
    })
    .then(function () {
      displayWeather();

      return cityid;
    })
    .then(function () {});
  console.log(cityid);
}
console.log(weather.cityid);

function displayWeather() {
  iconELement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descELement.innerHTML = weather.description;
  locationELement.innerHTML = `${weather.city}, ${weather.country}`;
  feelsLikeElement.innerHTML = `<span>Feels Like : ${weather.feels_like}°C</span>`;
  pressureElement.innerHTML = `<span>Pressure : ${weather.pressure} Pa</span>`;
  humidityElement.innerHTML = `<span>Humidity : ${weather.humidity}%</span>`;
  maxTempElement.innerHTML = `<span>Highs : ${weather.max_temp}</span>`;
  minTempElement.innerHTML = `<span>Lows : ${weather.min_temp}</span>`;
  windSpeedElement.innerHTML = `<span>Wind Speed : ${weather.windSpeed} Km / h</span>`;
  windDirectionElement.innerHTML = `<span>Wind Direction : ${weather.windDirection}</span>`;
  sunriseElement.innerHTML = `${weather.sunrise}`;
  sunsetElement.innerHTML = `${weather.sunset}`;
  dateElement.innerHTML = `<i class="material-icons" style="position: relative; top:6px;">update</i>Last Update: ${weather.dateOfCalc}`;
  latElement.innerHTML = weather.lat;
  lonElement.innerHTML = weather.lon;
  uvIndexElement.innerHTML = `${weather.vis} m`;
}

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

switchButtonElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    weather.temperature.unit = "fahrenheit";
    tempELement.innerHTML = `${fahrenheit}°<span>C</span>`;
  } else {
    tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
  if (switchButtonElement.innerHTML == "Celsius") {
    switchButtonElement.innerHTML = "Fahrenheit";
  } else {
    switchButtonElement.innerHTML = "Celsius";
  }
  switchButtonElement.style =
    "transition: cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.5s; color: #16a085; padding-left:10px";
});
