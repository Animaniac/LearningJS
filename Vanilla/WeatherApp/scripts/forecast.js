const key = '92Aoo4rQrGAqrFTSOyGhAU1bLhJcV8kW';
const getCity = async city => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

getCity('manchester')
  .then(data => console.log(data))
  .catch(error => console.log(error));