const inputElement = document.querySelector('.search-container input');
const buttonElement = document.querySelector('.search-container button');
const weatherIcon = document.querySelector('.js-weather-icon');
const temperature = document.querySelector('.result-container h1');
const city = document.querySelector('.js-city-name');
const humidityPercentage = document.querySelector('.js-percentage');
const windSpeed = document.querySelector('.js-speed');





document.querySelector('.js-result-container').style.display = 'none';
const apiKey = 'd770369cabc337f68fb15959fda47bd0';



async function getWeatherData(){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&appid=${apiKey}&units=metric`;
  const data = await fetch(url);
  const weatherData = await data.json();
  changeTheDom(weatherData);
}

function changeTheIcon(weatherCondition){
  weather = weatherCondition.toLowerCase();
  weatherIcon.src = `./images/${weather}.png`;
}


function changeTheDom(weatherData){
  const weatherCondition = weatherData.weather[0].main;
  temperature.innerHTML = `${weatherData.main.temp}°c`;
  city.innerHTML = weatherData.name;
  humidityPercentage.innerHTML = `${weatherData.main.humidity}%`;
  windSpeed.innerHTML = `${weatherData.wind.speed}km/h`;

  switch(weatherCondition){
    case 'Clouds':
      changeTheIcon('Clouds');
      break;

    case 'Clear':
      changeTheIcon('Clear');
      break;

    case 'Rain':
      changeTheIcon('Rain');
      break;

    case 'Drizzle':
      changeTheIcon('Drizzle');
      break;

    case 'Snow':
      changeTheIcon('Snow');
      break;

    case 'Wind':
      changeTheIcon('Wind');
  }
}
buttonElement.addEventListener('click', () => {
  resultContainer = document.querySelector('.js-result-container');
  resultContainer.style.display = 'flex';
  getWeatherData();
});

