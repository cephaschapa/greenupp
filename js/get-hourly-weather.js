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
          let tempDay = Math.floor(weather.temp.day - KELVIN);
          let max = Math.floor(weather.temp.max - KELVIN);
          let minTemp = Math.floor(weather.temp.min - KELVIN);
          let tempEv = Math.floor(weather.temp.eve - KELVIN);
          let tempMorn = Math.floor(weather.temp.morn - KELVIN);

          console.log(day);
          let dailyElement = document.querySelector(".daily-weather-container");
          
          if (weather != undefined) {

            dailyElement.innerHTML += `
            <div class="col s12 m6 l6 daily-el">
            <div class="card white ">
              <div class="card-content">
              <div class="row">
                

                <div class="col s12">
                  <div class="row">
                    <div class="col s12 center grey-text">
                    
                      <span class="grey-text">${day.slice(0, 3).toUpperCase()}</span>
                      <p><img  class="grey-text" src="./icons/${overView.icon}.png" style="height:43px; width:43px; background:white; border-radius:5%; position:relative;"/></p>
                      <p style="position:relative; color: #16a085">${overView.description.toUpperCase()}</p>
                      <span><i class="material-icons" style="position: relative; top:5px" ></i> W.SP : ${weather.wind_speed} km/h</span> <i class="material-icons" style="position: relative; font-size:10px; top:0px"> </i> |
                      
                      <span><i class="material-icons" style="position: relative; top:5px" ></i>HUM : ${weather.humidity}%</span> |
                      <span><i class="material-icons" style="position: relative; top:5px" ></i>UV INDEX : ${weather.uvi}</span>
                     </div>
                  </div>
                  <div class="row center">
                    <div class="col s12 white-text weath-el">
                      <div style="font-size:20px !important;background:#1dd1a1; border-radius:px; padding: 3px; width:50%" ><i class="material-icons orange-text" style="position: relative; font-size:15px; top:-5px">brightness_5 </i> <span>${tempMorn}</span><sup><span style="font-size:12px;">°C</span></sup></div>
                      <div style="font-size:20px; background:#10ac84; border-radius:px; padding: 3px; width:50%" ><i class="material-icons yellow-text" style="position: relative; font-size:15px; top:-5px">wb_sunny </i> <span>${tempDay}</span><sup><span style="font-size:12px;">°C</span> <span style="font-size:10px"></span></sup></div>
                      <div style="font-size:20px !important; background:#1dd1a1; border-radius:px; padding: 3px; width:50%" ><i class="material-icons yellow-text" style="position: relative; font-size:15px; top:-5px">brightness_2 </i> <span>${tempEv}</span><sup><span style="font-size:12px;">°C</span></sup></div>
                      <div style="font-size:20px; background:#10ac84; border-radius:px; padding: 3px; width:50%" ><i class="material-icons white-text" style="position: relative; font-size:15px; top:-5px">arrow_upward </i> <span>${max}</span><sup><span style="font-size:12px;">°C</span></sup></div>
                      <div style="font-size:20px !important; background:#1dd1a1; border-radius:px; padding: 3px; width:50%" ><i class="material-icons white-text" style="position: relative; font-size:15px; top:-5px">arrow_downward </i> <span>${minTemp}</span><sup><span style="font-size:12px;">°C</span></sup></div>
                      
                     
                    </div>
                  </div>
                  <div class="chart_area" style="width:100%">
                  </div>
                </div>
                
              </div>
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
      let hourly = data.hourly
      console.log(hourly)
      google.charts.load("current", {packages:["corechart"]});
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Time of Day', 'Temp'],
              ['Morning', tempMorn],
              ['Day', tempDay],
              ['Evening', tempEv],
              ]);
    
            var options = {
              title: 'Temperature',
              legend: { position: 'center' },
            };
    
            var chart = new google.visualization.LineChart(document.getElementsById('chart_area'));
            chart
            let myChart = chart.draw(data, options) 

            console.log(myChart)
          }
    });
   
  fetch(api)
}

const keys = "2516110a77ef7d9fef9c82eb19b3f4d3";
