import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurreny,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div>
            <input type="numbr" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurreny} onChange={onChangeCurrency}> { /* 1 */ }
                {currencyOptions.map(option => (
                    <option key={option} value={option} >{option}</option>
                ))}
            </select>
        </div>
    )
}


{ /* 

    1- every time we change the vale we will cal onChangeCurrency which will call the function in App onChangeCurrency

*/ }

