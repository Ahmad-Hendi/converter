import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow.js';





function App() {

  
  
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState([])
  const [amount, setAmount] = useState(1) 
  { /* the amount */ }
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  { /* to knwo if we change from the toCurrency or fromCurrency */ }
  
  const BASE_URL = "https://api.exchangeratesapi.io/latest"
  console.log(currencyOptions);
  console.log(exchangeRate);
  
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount  = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])




  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates) ])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency]) 
        { /* the actual rate for the currency */ }
        console.log(data);
      })
  }, [])

  function handleFromAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  
  function handleToAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurreny = {fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div className="equal" >=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurreny = {toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
    </>

  );
}
  

  






export default App;
