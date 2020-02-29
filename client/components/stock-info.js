import React, {useState} from 'react'
import {connect} from 'react-redux'
import {savingPurchase} from '../store/portfolio'

const Stock = props => {
  const [stockQuantity, setStockQuantity] = useState(0)
  const stockInfo = props.stockInfo

  const handleChange = event => {
    setStockQuantity(event.target.value)
  }

  const handlePurchase = userId => {
    const info = {
      ticker: stockInfo.symbol,
      shares: stockQuantity,
      priceAtPurchase: stockInfo.price
    }
    props.savingPurchase(userId, info)
  }
  return (
    <div className="stockWrapper">
      <div className="stockInfoContainer">
        <div>Ticker Symbol: {stockInfo.symbol}</div>
        <div>Open Price: ${stockInfo.open}</div>
        <div>High Price: ${stockInfo.high}</div>
        <div>Low Price: ${stockInfo.low}</div>
        <div>Previous Closing Price: ${stockInfo.previousClose}</div>
        <div>Current Price: ${stockInfo.price}</div>
        <div>Change: ${stockInfo.change}</div>
      </div>
      <input
        name="buyShares"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
      />
      <button type="button" onClick={() => handlePurchase(props.user.id)}>
        Purchase
      </button>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  savingPurchase: (userId, info) => dispatch(savingPurchase(userId, info))
})

export default connect(mapState, mapDispatch)(Stock)
