import React, {useState} from 'react'
import {connect} from 'react-redux'
import {savingPurchase} from '../store/portfolio'
import {updateCashBalance} from '../store/user'

const Stock = props => {
  const [stockQuantity, setStockQuantity] = useState(0)
  const {stockInfo, user} = props

  const handleChange = event => {
    setStockQuantity(event.target.value)
  }

  const handlePurchase = userId => {
    const info = {
      ticker: stockInfo.symbol,
      shares: stockQuantity,
      priceAtPurchase: (+stockInfo.price * 100).toFixed(0)
    }
    props.savingPurchase(userId, info)
    props.updateCashBalance(userId, info)
  }
  return (
    <div className="stockWrapper">
      <div className="stockInfoContainer">
        <div>Ticker Symbol: {stockInfo.symbol}</div>
        <div>Open Price: ${(+stockInfo.open).toFixed(2)}</div>
        <div>High Price: ${(+stockInfo.high).toFixed(2)}</div>
        <div>Low Price: ${(+stockInfo.low).toFixed(2)}</div>
        <div>
          Previous Closing Price: ${(+stockInfo.previousClose).toFixed(2)}
        </div>
        <div>Current Price: ${(+stockInfo.price).toFixed(2)}</div>
        <div>Change: ${(+stockInfo.change).toFixed(2)}</div>
      </div>
      <input
        name="buyShares"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
      />
      <button type="button" onClick={() => handlePurchase(user.id)}>
        Purchase
      </button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  savingPurchase: (userId, info) => dispatch(savingPurchase(userId, info)),
  updateCashBalance: (userId, purchaseInfo) =>
    dispatch(updateCashBalance(userId, purchaseInfo))
})

export default connect(null, mapDispatch)(Stock)
