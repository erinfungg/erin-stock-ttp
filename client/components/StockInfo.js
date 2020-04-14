import React, {useState} from 'react'
import {connect} from 'react-redux'
import {savingPurchase} from '../store/portfolio'
import {updateCashBalance} from '../store/user'
import {savingTransaction} from '../store/transactions'

const Stock = props => {
  const [stockQuantity, setStockQuantity] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const {stockInfo, user, cashBalance} = props

  const handleChange = event => {
    setErrorMessage('')
    setStockQuantity(event.target.value)
  }

  const handlePurchase = userId => {
    if (stockQuantity <= 0) {
      setErrorMessage('Must be valid quantity.')
      return
    }
    const info = {
      ticker: stockInfo.symbol,
      company: stockInfo.company,
      shares: stockQuantity,
      priceAtPurchase: (+stockInfo.price * 100).toFixed(0)
    }
    const balance =
      cashBalance - (+stockInfo.price * 100 * stockQuantity).toFixed(0)
    if (balance < 0) {
      setErrorMessage('Sorry! Not enough money.')
    } else {
      props.savingPurchase(userId, info)
      props.updateCashBalance(userId, info)
      props.savingTransaction(userId, info)
    }
  }
  return (
    <div className="stock-wrapper">
      <div className="stockInfoContainer">
        <div>Ticker Symbol: {stockInfo.symbol}</div>
        <div>Company: {stockInfo.company}</div>
        <div>
          Previous Closing Price: ${(+stockInfo.previousClose).toFixed(2)}
        </div>
        <div>Current Price: ${(+stockInfo.price).toFixed(2)}</div>
        <div>Change: {(+stockInfo.change).toFixed(4)}%</div>
      </div>
      <div className="purchase">
        <input
          style={{width: '100px'}}
          name="buyShares"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
        />
        <button type="button" onClick={() => handlePurchase(user.id)}>
          Purchase
        </button>
        {errorMessage ? <div>{errorMessage}</div> : null}
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  savingPurchase: (userId, info) => dispatch(savingPurchase(userId, info)),
  updateCashBalance: (userId, purchaseInfo) =>
    dispatch(updateCashBalance(userId, purchaseInfo)),
  savingTransaction: (userId, info) => dispatch(savingTransaction(userId, info))
})

export default connect(null, mapDispatch)(Stock)
