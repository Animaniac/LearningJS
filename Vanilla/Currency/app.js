const exchangeForm = document.getElementById('exchangeForm');
const filterForm = document.getElementById('filterForm');
const currencyFrom = document.getElementById('currFrom');
const currencyTo = document.getElementById('currTo');
const result = document.getElementById('result');
const logTable = document.getElementById('logBody');
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');

let logs = [{
  date: new Date(2019,00,01),
  time: '11:30',
  currFrom: 'GBP',
  currTo: 'AUD',
  rate: 2,
  amount: 1000,
  result: 500
}];

const exchangeRatesToGBP = {
  GBP: 1,
  EUR: 1.25,
  USD: 1.5,
  AUD: 2
};

const exchangeCurrency = (amount,from,to) => 
  exchangeRatesToGBP[to] / exchangeRatesToGBP[from] * amount;

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

const createLog = exchangeDetails => {
  const logged = new Date();
  const formattedTime = `${logged.getHours()}:${logged.getMinutes()}`;

  logs.push({
    date: logged,
    currFrom: exchangeDetails.currencyFrom,
    currTo: exchangeDetails.currencyTo,
    rate: exchangeDetails.rate,
    amount: exchangeDetails.amountToexchange,
    result: exchangeDetails.exchangeedAmount
  });
};

exchangeForm.addEventListener('submit', e => {
  e.preventDefault();
  const amount = exchangeForm.fromAmount.value;
  const curFrom = currencyFrom.value;
  const currTo = currencyTo.value;

  let exchangeedAmount = exchangeCurrency(amount, curFrom, currTo);
  let formattedAmount = formatCurrency(exchangeedAmount, currTo);

  let exchangeDetails = {
    currencyFrom: curFrom,
    currencyTo: currTo,
    amountToexchange: amount,
    exchangeedAmount: exchangeedAmount,
    rate: exchangeedAmount/amount
  }

  result.textContent = `exchangeed amount is: ${formattedAmount}`;
  createLog(exchangeDetails);
  displayLogs(logs);
  //exchangeForm.reset();
});

filterForm.addEventListener('submit', e => {
  e.preventDefault();

  filterLogs(new Date(dateFrom.value), new Date(dateTo.value));

  filterForm.reset();
});

const displayLogs = logList => {  
  logTable.innerHTML = "";
  Array.from(logList, log => {
    let logHtml = `
      <tr>
        <td>${log.date.toLocaleDateString()}</td>
        <td>${log.date.getHours()}:${log.date.getMinutes()}</td>
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
    return log.date >= dateFrom && log.date <= dateTo;
  });

  displayLogs(filteredLogs);
};

setOptions(exchangeRatesToGBP, currencyFrom);
setOptions(exchangeRatesToGBP, currencyTo);
displayLogs(logs);