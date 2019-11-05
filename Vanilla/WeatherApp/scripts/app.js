const cityForm = document.querySelector('form');

const updateCity = async city => {
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);
    console.log(weather);
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    cityForm.reset();

    updateCity(city);
});