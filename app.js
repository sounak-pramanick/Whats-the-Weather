const currentTempField = document.querySelector(".weather1 p");
const lowHighTempField = document.querySelector(".weather1 span");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
const data1 = document.querySelectorAll(".conditions .left p");
const data2 = document.querySelectorAll(".conditions .right p");

const apiKey = API_KEY;
let target = "Kolkata";

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    
    // destructuring data from Weather API
    const {
        current: {
            temp_c,
            condition: {text, icon},
            feelslike_c, humidity, pressure_mb, vis_km, uv, precip_mm, wind_kph, wind_dir
        },
        forecast: {
          forecastday: {
            0: {
              astro: {sunrise, sunset},
              day: {maxtemp_c, mintemp_c}
            }
          }
        },
        location: {name, localtime, country}
    } = data;
    
    updateDom(temp_c, maxtemp_c, mintemp_c, feelslike_c, humidity, pressure_mb, vis_km, uv, precip_mm, wind_kph, wind_dir, sunrise, sunset, name, localtime, country, icon, text);
  }
  catch(error) {
    alert("Location not found :(");
  }
}

fetchData(target);

const updateDom = (temperature, maxTemp, minTemp, feelsLike, humidity, pressure, visibility, uv, precipitation, windSpeed, windDirection, sunRise, sunSet, city, time, country, emoji, text) => {
    currentTempField.innerText = `${temperature}°C`;
    lowHighTempField.innerText = `${minTemp}°C / ${maxTemp}°C`;
    cityField.innerText = `${city}, ${country}`;
    
    const currDate = time.split(" ")[0];
    const currTime = time.split(" ")[1];
    const currDay = getDayFullName(new Date(currDate).getDay());
    
    dateField.innerText = `${currTime} - ${currDay}, ${currDate}`;
    
    emojiField.src = emoji;
    weatherField.innerText = text;

    data1[0].innerText = `Feels like - ${feelsLike}°C`;
    data1[1].innerText = `Humidity - ${humidity}%`;
    data1[2].innerText = `Pressure - ${pressure}mb`;
    data1[3].innerText = `Wind Speed - ${windSpeed}km/h`;
    data1[4].innerText = `Sunrise - ${sunRise}`;
    
    data2[0].innerText = `UV Index - ${uv}`;
    data2[1].innerText = `Precipitation - ${precipitation}mm`;
    data2[2].innerText = `Visibility - ${visibility}km`;
    data2[3].innerText = `Wind Direction - ${windDirection}`;
    data2[4].innerText = `Sunset - ${sunSet}`;
}

const search = (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
  searchField.value = "";
}

form.addEventListener("submit", search);

function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturday";
  
      default:
        return "Wrong value!";
    }
}

// const forecastData = async () => {
//   fetch(`http://api.weatherapi.com/v1/forecast.json`)
// }