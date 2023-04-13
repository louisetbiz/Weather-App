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
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
   
}


let apiKey="ee030ced13bec32faetaa24oa4e6af48";
let city = "New York"
let apiURL=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiURL).then(displayTemperature);


