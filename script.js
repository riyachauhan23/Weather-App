document.getElementById('city').addEventListener('input', function () {
    var city = this.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather() {
    try {
        var city = document.getElementById('city').value;
        console.log('City name:', city);

        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                appid: '9610559c4b84f3af27cfb09c27d9e9af', // Your API key
                units: 'metric',
                cnt: 5
            }
        });

        console.log('Weather data:', response.data);
        const weatherData = response.data;

        // Update the date and location
        const currentDate = new Date();
        document.querySelector('.date-dayname').textContent = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        document.querySelector('.date-day').textContent = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        document.querySelector('.location').textContent = weatherData.city.name + ', ' + weatherData.city.country;

        // Update the current weather
        document.querySelector('.weather-temp').textContent = Math.round(weatherData.list[0].main.temp) + '°C';
        document.querySelector('.weather-desc').textContent = weatherData.list[0].weather[0].description;

        // Update the weather icon
        const iconId = weatherData.list[0].weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconId}.png`;
        document.querySelector('.weather-icon').innerHTML = `<img src="giphy.gif" alt="Weather icon">`;

        // Update humidity and wind values
        document.querySelector('.humidity .value').textContent = weatherData.list[0].main.humidity + '%';
        document.querySelector('.wind .value').textContent = weatherData.list[0].wind.speed + ' m/s';

        // Update the 5-day forecast
        const weekDays = [,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        for (let i = 1; i < 5; i++) {
            const forecast = weatherData.list[i];
            const dayName = weekDays[i];
            const dayTemp = Math.round(forecast.main.temp) + '°C';
            const dayIconId = forecast.weather[0].icon;
            const dayIconUrl = `http://openweathermap.org/img/w/${dayIconId}.png`;

            document.querySelectorAll('.week-list li')[i - 1].querySelector('.day-name').textContent = dayName;
            document.querySelectorAll('.week-list li')[i - 1].querySelector('.day-temp').textContent = dayTemp;
            document.querySelectorAll('.week-list li')[i - 1].querySelector('.day-icon').innerHTML = `<img src="${dayIconUrl}" alt="Weather icon">`;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Initial weather fetch on page load
document.addEventListener("DOMContentLoaded", function () {
    getWeather();
    setInterval(getWeather, 900000); // Update every 15 minutes
});
