const apiKey = 'a4ed50af70a6a4de91b37918dc912300';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDiv = document.getElementById('weather');

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  weatherDiv.innerHTML = 'Loading...';

  try {
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('City not found or invalid API request');
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherDiv.innerHTML = `
      <h3>Weather in ${city}</h3>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Description:</strong> ${description}</p>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}
