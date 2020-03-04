const convertForm = document.getElementById('convertForm');
const currencyFrom = document.getElementById('currFrom');
const currencyTo = document.getElementById('currTo');
const result = document.getElementById('result');

const exchangeRateToGBP = {
  GBP: 1,
  EUR: 1.25,
  USD: 1.5,
  AUD: 2
}

const convertCurrency = (amount,from,to) => convertedAmount = exchangeRateToGBP[from] / exchangeRateToGBP[to] * amount;

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

convertForm.addEventListener('submit', e => {
  e.preventDefault();
  const amount = convertForm.fromAmount.value;
  const curFrom = currencyFrom.value;
  const currTo = currencyTo.value;

  let convertedAmount = convertCurrency(amount, curFrom, currTo);
  let formattedAmount = formatCurrency(convertedAmount, currTo);

  result.textContent += `Converted amount is: ${formattedAmount}`;
  
  //cant decide if this is useful or annoying.
  convertForm.reset();
});