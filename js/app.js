import APIKey from "./token.js";
const container = document.querySelector(".container");
const weatherContainer = document.querySelector(".weather__information");
const cityElement = document.querySelector("#city");
const searcHBar = document.querySelector(".search__box input");
const searchButton = document.querySelector("#search");
const errorBox = document.querySelector(".error__box");
const temperatureElement = document.querySelector("#temperature");
const windElement = document.querySelector("#wind");
const humidityElement = document.querySelector("#humidity");
async function getWeatherInfo() {
  const cityName = searcHBar.value;
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
  fetch(APIUrl)
    .then((response) => response.json())
    .then((data) => {
      if (searcHBar.value == "") {
        container.style.height = "80px";
        setTimeout(() => {
          alert("Please wrote a city name before.");
        }, 500);
      } else if (data.cod == 404) {
        container.style.height = "380px";
        errorBox.style.display = "flex";
        weatherContainer.style.display = "none";
      } else {
        const { humidity, temp } = data.main;
        const wind = data.wind.speed;
        const city = data.name;
        temperatureElement.textContent = `${convertWeatherDegrees(temp)}°C`;
        windElement.textContent = `${wind}Km/h`;
        humidityElement.textContent = `${humidity}%`;
        cityElement.textContent = `${city}`;
        container.style.height = "550px";
        errorBox.style.display = "none";
        weatherContainer.style.display = "flex";
      }
      searcHBar.value = "";
    });
}


function convertWeatherDegrees(degrees) {
    return Math.floor((degrees - 32) / 1.8);
}

console.log(convertWeatherDegrees(328.4));

searchButton.addEventListener("click", getWeatherInfo);
window.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await getWeatherInfo();
  }
});
