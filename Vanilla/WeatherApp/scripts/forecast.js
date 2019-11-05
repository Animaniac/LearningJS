const key = '92Aoo4rQrGAqrFTSOyGhAU1bLhJcV8kW';
const getCity = async city => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

const getWeather = async cityKey => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `?apikey=${key}&q=${cityKey}`;
};

getCity('manchester')
  .then(data => getWeather(data.Key))
  .catch(error => console.log(error));
