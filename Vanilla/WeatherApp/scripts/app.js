const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) => {
    const cityInfo = data.cityInfo;
    const cityWeather = data.weather;

    details.innerHTML = `
        <h5 class="my-3">${cityInfo.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async city => {
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);
    
    return {cityInfo, weather};
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    cityForm.reset();

    updateCity(city).then(data => {
        updateUI(data);
    }).catch(error => console.log(error));
});