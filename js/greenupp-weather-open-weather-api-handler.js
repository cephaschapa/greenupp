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
//   notificationELement.style.display = "block";
//   notificationELement.innerHTML = `<p>${error.message}</p>`;
  //M.toast({html: error.message})
}

// GET WEATHER
function getWeather(latitude, longitude) {
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
      weather.sunrise = data.sys.sunrise;
      weather.sunset = data.sys.sunset;
      if (weather.windDirection > 0 && weather.windDirection < 45) {
        weather.windDirection = "NNE";
        return weather.windDirection;
      } else if (weather.windDirection > 45 && weather.windDirection < 90) {
        weather.windDirection = "NEE";
        return weather.windDirection;
      } else if (weather.windDirection == 90) {
        weather.windDirection = "Due East";
        return weather.windDirection;
      } else if (weather.windDirection > 90 && weather.windDirection < 135) {
        weather.windDirection = "SE";
        return weather.windDirection;
      } else if (weather.windDirection > 135 && weather.windDirection < 180) {
        weather.windDirection = "SSE";
        return weather.windDirection;
      } else if (weather.windDirection > 180 && weather.windDirection < 225) {
        weather.windDirection = "SSW";
        return weather.windDirection;
      } else if (weather.windDirection > 225 && weather.windDirection < 270) {
        weather.windDirection = "SWW";
        return weather.windDirection;
      } else if (weather.windDirection > 270 && weather.windDirection < 315) {
        weather.windDirection = "NWW";
        return weather.windDirection;
      } else if (weather.windDirection > 315 && weather.windDirection < 360) {
        weather.windDirection = "NW";
        return weather.windDirection;
      }
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  iconELement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descELement.innerHTML = weather.description;
  locationELement.innerHTML = `${weather.city}, ${weather.country}`;
  feelsLikeElement.innerHTML = `<span>Feels Like : ${weather.feels_like}</span>`;
  pressureElement.innerHTML = `<span>Pressure : ${weather.pressure}</span>`;
  humidityElement.innerHTML = `<span>Humidity : ${weather.humidity}</span>`;
  maxTempElement.innerHTML = `<span>Highs : ${weather.max_temp}</span>`;
  minTempElement.innerHTML = `<span>Lows : ${weather.min_temp}</span>`;
  windSpeedElement.innerHTML = `<span>Wind Speed : ${weather.windSpeed} Km / h</span>`;
  windDirectionElement.innerHTML = `<span>Wind Direction : ${weather.windDirection}</span>`;
  sunriseElement.innerHTML = `${weather.sunrise}`;
  sunsetElement.innerHTML = `${weather.sunset}`;
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
