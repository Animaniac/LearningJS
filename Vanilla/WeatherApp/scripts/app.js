const cityForm = document.querySelector('form');

const updateCity = async city => {
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);
    
    return {
        cityInfo: cityInfo,
        weather: weather
    };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    cityForm.reset();

    updateCity(city).then(data => {
        console.log(data);
    }).catch(error => console.log(error));
});