const form = document.getElementById('locationForm');
const weatherInfo = document.getElementById('weatherInfo');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value;
  getWeather(location);
  locationInput.value = '';
});

async function getWeather(location) {
  const apiKey = '57f9e4b91df2004894cda5b6c0e5b31b'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;

      weatherInfo.innerHTML = `
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
      `;
    } else {
      weatherInfo.innerHTML = 'Error fetching weather data. Please try again.';
    }
  } catch (error) {
    weatherInfo.innerHTML = 'An error occurred. Please try again later.';
  }
}