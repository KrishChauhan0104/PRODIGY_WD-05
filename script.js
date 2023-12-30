document.addEventListener('DOMContentLoaded', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      }, handleError);
    } else {
      document.getElementById('weather-info').textContent = 'Geolocation is not supported by your browser.';
    }
  });
  
  function getWeatherData(latitude, longitude) {
    const apiKey = 'f605ac2cdc7a957e5dbe34ee3b973416';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => displayWeatherData(data))
      .catch(error => console.error('Error:', error));
  }
  
  function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
  
    weatherInfo.innerHTML = `
      <p>City: ${cityName}</p>
      <p>Temperature: ${temperature}°C</p>
      <p>Condition: ${description}</p>
    `;
  }
  
  function handleError(error) {
    document.getElementById('weather-info').textContent = `Error: ${error.message}`;
  }
  