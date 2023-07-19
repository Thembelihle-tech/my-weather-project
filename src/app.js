function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours =`0${hours}`
        }
    let minutes = date.getMinutes();
    if (minutes < 10){
    minutes =`0${minutes}`
    }
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    let day = days[date.getDay()];
    return day;
}
function displayForecast(response){
    let forecast = response.data.daily;
    let foreastElement = document.querySelector('#forecast');
    let forecastHTML = `<div class="row">`;

    forecast.forEach(function(forecastDay,index){
        if (index<6){
            forecastHTML +=`
            <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"  alt="" width="50
                ">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
            </div>
        `;
        }
      
    })
   
forecastHTML =forecastHTML + `</div>`;
    foreastElement.innerHTML = forecastHTML;
    
}
function forecast(coordinates){
    let apiKey ='9b83e8ad2ddeet40240oc805fd6709a7';
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    
}
function displayTemperature(response)
{
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celciusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celciusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute('src',`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
    iconElement.setAttribute('alt',response.data.condition.description)
    forecast(response.data.coordinates);
    
}
function search(city){
let apiKey ='9b83e8ad2ddeet40240oc805fd6709a7';
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
event.preventDefault();
let inputCityElement = document.querySelector('#city-input');
search(inputCityElement.value);
}

let form = document.querySelector('#search-form');
form.addEventListener("submit",handleSubmit);

search('Pretoria');
displayForecast();