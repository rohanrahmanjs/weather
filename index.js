const searchBtn = document.querySelector('.search button');
const cityName = document.querySelector('.search input');
const temp = document.querySelector('.weather h1')
const city = document.querySelector('.weather h2')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const weatherIcon = document.querySelector('.weatherIcon')


//  API LINK



const apiKey = '151fceb2ecd7b25e064557fd4189d6ad';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function checkWeather(ctn) {
    const response = await fetch(apiUrl + ctn + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = "none";
    } else {
        let data = await response.json();

        temp.innerHTML = Math.round(data.main.temp) + '°C';
        city.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + '%';
        wind.innerHTML = Math.round(data.wind.speed) + ' km/h'

        let forImg = data.weather[0].main;
        if (forImg === 'Clouds') {
            weatherIcon.src = "images/clear.png"
        } else if (forImg === "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (forImg === "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (forImg === "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';

    }


}


searchBtn.addEventListener('click', () => {
    checkWeather(cityName.value)
    cityName.value = '';

})

cityName.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        checkWeather(cityName.value)
        cityName.value = '';
    }
})