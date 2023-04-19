function formateDate(timestamp){
let date = new Date (timestamp);
let hours = date.getHours();
if (hours <10){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10){
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`;
}



function displayTemperature(response){
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formateDate(response.data.time *1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

    celsiusTemperature = response.data.temperature.current;
    
    getForecast(response.data.city);
}



function getForecast(city){
let apiKey="ee030ced13bec32faetaa24oa4e6af48";
let apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayForecast);
}

displayForecast();


function search(city){
let apiKey="ee030ced13bec32faetaa24oa4e6af48";
let apiURL=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);

}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}
function displayForecast() {

    let forecastElement = document.querySelector("#weather-forecast");
     
    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat"];
    days.forEach(function(day) {
       forecastHTML = forecastHTML +  `   
                <div class="col-2">
                    <div class="day">
                    ${day}
                    </div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                        alt=""
                        width="36"/>
                        <div class="temperature-forecast">
                       <span class="weather-forecast-max">
                        <strong>18°</strong> </span>
                        <span class="weather-forecast-min"> 12°</span>
                        </div>
                </div>
            `;
});
    forecastHTML= forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}
function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

search("Madrid");


let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);



   
search("Madrid");
