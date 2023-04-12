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
    
}


let apiKey="ee030ced13bec32faetaa24oa4e6af48";

let apiURL=`https://api.shecodes.io/weather/v1/current?query=Madrid&key=${apiKey}`;

axios.get(apiURL).then(displayTemperature);


