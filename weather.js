const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const apikey = "0e5a30d0fefc1a348dcfdd5ab1447df2";
const newTemp = document.getElementById("temp");
const newCity = document.getElementById("city")
const newDesc = document.getElementById("desc")
const newAdv = document.getElementById("advice")
const newFeel = document.getElementById("feel")
const newhumdity = document.getElementById("humdity")
const newSpeed = document.getElementById("speed")
const newCloud = document.getElementById("clouds")

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      console.log(weatherData);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("could not fethc weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity, feels_like },
    weather: [{ description, id }],
    wind: { speed }
  } = data;

  console.log({
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
    wind: { speed }
  })

  const weather = getWeatherInfo(id);

  newTemp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  newCity.textContent = city;
  newDesc.textContent = description;
  newAdv.textContent = weather.description;
  newFeel.textContent = `${(feels_like - 273.15).toFixed(1)}°C`;
  newhumdity.textContent = `${humidity}%`
  newSpeed.textContent = `${(speed*3.6).toFixed(1)} km\h`
  newCloud.src = weather.emoji
}

function getWeatherInfo(weatherId) {
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        return { emoji: "assets/thunderstorm.svg", description: "Thunderstorms in the area — stay safe!" };
      case weatherId >= 300 && weatherId < 400:
        return { emoji: "assets/rainy.svg", description: "Light drizzle falling — maybe grab a light jacket." };
      case weatherId >= 500 && weatherId < 600:
        return { emoji: "assets/rainy.svg", description: "It’s raining out — don’t forget your umbrella!" };
      case weatherId >= 600 && weatherId < 700:
        return { emoji: "assets/snow.svg", description: "Snowy skies — a perfect day for hot cocoa." };
      case weatherId >= 700 && weatherId < 800:
        return { emoji: "assets/foggy.svg", description: "Low visibility with mist or haze — drive carefully." };
      case weatherId === 800:
        return { emoji: "assets/clearDay.svg", description: "Clear skies and sunshine — a beautiful day!" };
      case weatherId >= 801 && weatherId < 810:
        return { emoji: "assets/cloud.svg", description: "A bit cloudy, but still a beautiful day." };
      default:
        return { emoji: "assets/error.svg", description: "Weather data is unclear — look outside!" };
    }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
