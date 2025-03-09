const lg = console.log;

// Selecting elements by their IDs
const container = document.getElementById("container");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const toInput = document.getElementById("toInput");
const toOutput = document.getElementById("toOutput");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");
const rateDiv = document.getElementById("swap-and-rate-div");

toCurrency.value = "NPR";

// Logging to verify selection

const url = `https://v6.exchangerate-api.com/v6/5aa7bbef8b5cde5a3cf2cf4f/latest/USD`;

toInput.addEventListener("input", populateCurrency);
toCurrency.addEventListener("change", populateCurrency);
fromCurrency.addEventListener("change", populateCurrency);

function populateCurrency() {
  const selectedCurrency = fromCurrency.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/5aa7bbef8b5cde5a3cf2cf4f/latest/${selectedCurrency}`
  )
    .then((res) => res.json())
    .then((data) => {
      const todayRate = data.conversion_rates[toCurrency.value];
      const total = todayRate * +toInput.value;
      toOutput.value = total.toFixed(2);
      lg(data);
      rate.textContent = `${toCurrency.value} ${todayRate}`;
    })
    .catch((error) => {
      lg("Error fetching exchange rate:", error);
    });
}
populateCurrency();
