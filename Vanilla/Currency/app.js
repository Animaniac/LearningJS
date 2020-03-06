
const convertForm = document.getElementById('convertForm');
const filterForm = document.getElementById('filterForm');
const currencyFrom = document.getElementById('currFrom');
const currencyTo = document.getElementById('currTo');
const result = document.getElementById('result');
const logs = document.getElementById('logBody');


const exchangeRateToGBP = {
  GBP: 1,
  EUR: 1.25,
  USD: 1.5,
  AUD: 2
}

const convertCurrency = (amount,from,to) => convertedAmount = exchangeRateToGBP[to] / exchangeRateToGBP[from] * amount;

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat('en-GB', 
    { currency: currency,
      style: 'currency',
    }).format(amount);
};

const setOptions = (currencies, element) => {
  for(const country in currencies){
    let newOption = document.createElement('option');

    newOption.textContent = country;

    element.appendChild(newOption);
  };
};

setOptions(exchangeRateToGBP, currencyFrom);
setOptions(exchangeRateToGBP, currencyTo);
{/* <td>${loggedTime.getDate()}/${loggedTime.getMonth()}/${loggedTime.getFullYear()}</td> */}
const createLog = conversionDetails => {
  const loggedTime = new Date();
  const fomrattedTime = `${loggedTime.getHours()}:${loggedTime.getMinutes()}` 
  const logHtml = `
    <tr>
      <td>${loggedTime.toLocaleDateString()}</td>
      <td>${fomrattedTime}</td>
      <td>${conversionDetails.currencyFrom}</td>
      <td>${conversionDetails.currencyTo}</td>
      <td>${conversionDetails.rate}</td>
      <td>${conversionDetails.amountToConvert}</td>
      <td>${conversionDetails.convertedAmount}</td>
    </tr>
  `;
  logs.innerHTML += logHtml;
};

convertForm.addEventListener('submit', e => {
  e.preventDefault();
  const amount = convertForm.fromAmount.value;
  const curFrom = currencyFrom.value;
  const currTo = currencyTo.value;

  let convertedAmount = convertCurrency(amount, curFrom, currTo);
  let formattedAmount = formatCurrency(convertedAmount, currTo);

  let conversionDetails = {
    currencyFrom: curFrom,
    currencyTo: currTo,
    amountToConvert: amount,
    convertedAmount: formattedAmount,
    rate: convertedAmount/amount
  }

  result.textContent = `Converted amount is: ${formattedAmount}`;
  createLog(conversionDetails);
  //make the covnert async
  //log async?
  //logger.CreateLog(conversionDetails);
  
  //cant decide if this is useful or annoying.
  //convertForm.reset();
});

filterForm.addEventListener('submit', e => {
  e.preventDefault();

  filterForm.reset();
})