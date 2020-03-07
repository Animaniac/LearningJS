
const exchangeForm = document.getElementById('exchangeForm');
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

const exchangeRatesToGBP = {
  GBP: 1,
  EUR: 1.25,
  USD: 1.5,
  AUD: 2
};

const exchangeCurrency = (amount,from,to) => exchangeRatesToGBP[to] / exchangeRatesToGBP[from] * amount;

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
    date: logged.toLocaleDateString('en-GB'),
    time: formattedTime,
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

  filterLogs(dateFrom.value,dateTo.value);

  filterForm.reset();
});

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
    let logTime = new Date(log.date).getTime();
    console.log(log.date,"log date >= fromDate", new Date(log.date) >= new Date(dateFrom));
    console.log(log.date,"log date <= toDate", new Date(log.date) >= new Date(dateTo));
    return logTime <= new Date(dateTo).getTime() && logTime >= new Date(dateFrom).getTime();
  });

  displayLogs(filteredLogs);
};

setOptions(exchangeRatesToGBP, currencyFrom);
setOptions(exchangeRatesToGBP, currencyTo);
displayLogs(logs);
