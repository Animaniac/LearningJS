
const convertForm = document.getElementById('convertForm');
const filterForm = document.getElementById('filterForm');
const currencyFrom = document.getElementById('currFrom');
const currencyTo = document.getElementById('currTo');
const result = document.getElementById('result');
const logTable = document.getElementById('logBody');
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');



//included some dummy data so you can filter it
let logs = [{
  date: '01/01/2019',
  time: '11:30',
  currFrom: 'GBP',
  currTo: 'AUD',
  rate: 2,
  amount: 1000,
  result: 500
}];

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

const createLog = conversionDetails => {
  const logged = new Date();
  const formattedTime = `${logged.getHours()}:${logged.getMinutes()}`;

  logs.push({
    date: logged.toLocaleDateString('en-GB'),
    time: formattedTime,
    currFrom: conversionDetails.currencyFrom,
    currTo: conversionDetails.currencyTo,
    rate: conversionDetails.rate,
    amount: conversionDetails.amountToConvert,
    result: conversionDetails.convertedAmount
  });
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
    convertedAmount: convertedAmount,
    rate: convertedAmount/amount
  }

  result.textContent = `Converted amount is: ${formattedAmount}`;
  createLog(conversionDetails);
  displayLogs(logs);
  //convertForm.reset();
});

filterForm.addEventListener('submit', e => {
  e.preventDefault();

  filterLogs(dateFrom.value,dateTo.value);

  filterForm.reset();
})

const displayLogs = logList => {  
  logTable.innerHTML = "";
  Array.from(logList, log => {
  let logHtml = `
    <tr>
      <td>${log.date}</td>
      <td>${log.time}</td>
      <td>${log.currFrom}</td>
      <td>${log.currTo}</td>
      <td>${log.rate}</td>
      <td>${log.amount}</td>
      <td>${log.result}</td>
    </tr>
  `;
  
  logTable.innerHTML += logHtml;
  });
};

const filterLogs = (dateFrom, dateTo) => {
  let filteredLogs = [...logs].filter(log => {
    return new Date(log.date).getTime() <= new Date(dateTo).getTime() && new Date(log.date).getTime() >= new Date(dateFrom).getTime();
  });
  console.log(filteredLogs);
  displayLogs(filteredLogs);
};

setOptions(exchangeRateToGBP, currencyFrom);
setOptions(exchangeRateToGBP, currencyTo);
displayLogs(logs);
