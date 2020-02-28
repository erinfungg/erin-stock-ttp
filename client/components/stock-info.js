import React from 'react'

const Stock = props => {
  const stockInfo = props.stockInfo
  return (
    <div className="stockWrapper">
      <div className="stockInfoContainer">
        <div>Ticker Symbol: {stockInfo.symbol}</div>
        <div>Open Price: {stockInfo.open}</div>
        <div>High Price: {stockInfo.high}</div>
        <div>Low Price: {stockInfo.low}</div>
        <div>Previous Closing Price: {stockInfo.previousClose}</div>
        <div>Change: {stockInfo.change}</div>
      </div>
      <input name="buyShares" type="number" placeholder="Quantity" />
      <button type="button">Purchase</button>
    </div>
  )
}

export default Stock
