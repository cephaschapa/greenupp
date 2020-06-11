// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationELement.style.display = "block";
  notificationELement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// SET USER'S POSITION
// let KELVIN = 273;
let latitude;
let longitude;
function setPosition(position, latitude, longitude) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude + "," + longitude);

  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${keys}`;
  console.log(api);

  fetch(api)
    .then(function (response) {
      let data = response.json();
      console.log(data);
      return data;
    })
    .then(function (data) {
      console.log(data.daily);
      let dailyData = data.daily;
      for (let i = 0; i < dailyData.length; i++) {
        let weather = dailyData[i];
        let weather2 = dailyData[i].weather;

        for (let i = 0; i < weather2.length; i++) {
          console.log(weather2[i]);
          let overView = weather2[i];
          let time = weather.dt;

          let mils = time * 1000;
          let timeObj = new Date(mils);
          let day = timeObj.toDateString();
          let temperature = weather.temp.day;

          console.log(day);
          let dailyElement = document.querySelector(".daily-weather-container");
          if (weather != undefined) {
            dailyElement.innerHTML += `
            <div class="col s6 m4 l3">
            <div class="card white carousel-item">
             <div class="card-content center">
             <p class="grey-text">${day}</p>
             <img class="grey-text" src="./icons/${overView.icon}.png"/>
             <div class="grey-text">
              <p>${overView.description.toUpperCase()}</p>
              <p><i class="material-icons">opacity</i>${temperature}</p>
              <p>${weather.wind_deg}</p>
              <p>${weather.humidity}</p>
             </div>
             </div>
            </div>
           </div>
            `;
          } else {
            dailyElement.innerHTML = `
          <p class="white-text">Loading content...</p>
          <div class="progress center">
              <div class="indeterminate">
  
              </div>
          </div>
          `;
          }
        }
        console.log(weather2);
        console.log(weather);
        console.log(weather.temp.day);
      }
    });
}

const keys = "2516110a77ef7d9fef9c82eb19b3f4d3";
