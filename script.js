document.getElementById('get-weather-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = 'a9a2d2b038cb48ab81542405241206';  
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error.message);
                return;
            }
            console.log(data);

            const forecast = data.forecast.forecastday;
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = '';

            forecast.forEach(day => {
                const weatherCard = document.createElement('div');
                weatherCard.classList.add('weather-card');

                const date = new Date(day.date).toDateString();
                console.log(date);
                const icon = day.day.condition.icon;  // day.day.condition.icon.startsWith("//") ? "https:" + day.day.condition.icon : day.day.condition.icon;
                const temp = day.day.avgtemp_c;
                const condition = day.day.condition.text;

                weatherCard.innerHTML = `
                    <h2>${date}</h2>
                    <img src="${icon}" alt="${condition}">
                    <p>${temp}°C</p>
                    <p>${condition}</p>
                `;

                weatherContainer.appendChild(weatherCard);
            });
        })
        .catch(error => {
            showError('An error occurred while fetching the weather data.');
            console.error('Error fetching weather data:', error);
        });
});

function showError(message) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}
