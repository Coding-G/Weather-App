const apiKey = "bcf4b630a8a1667bee67d512d7cb5041";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
updateBackground();

function updateBackground() {
    let backgroundImage;
    const hours = new Date().getHours();
    if (hours >=5 && hours <=8) {
        backgroundImage = "url('sunrise.jpg')";
    } else if (hours >8 && hours <= 18) {
        backgroundImage = "url('midday.jpg')";
    } else if (hours > 18 && hours <= 21) {
        backgroundImage = "url('sunset.jpg')";
    } else {
        backgroundImage = "url('night.jpg')"
    }
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
function searchCity() {
        const city = document.getElementById("cityInput").value;
        getWeather(city);
    
}
function displayWeather(data) {
    const weatherDiv = document.getElementById("display");
    weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    `;
}
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
        updateBackground();
    } catch (error) {
        console.error(error);
    }
}
