import React from 'react'
import {connect} from 'react-redux'
import {getStock} from '../store/stock'
import Stock from './stock-info'

/**
 * COMPONENT
 */
export const Portfolio = props => {
  const [ticker, setTicker] = React.useState({})

  const {cashBalance, stockInfo} = props

  const handleChange = event => {
    setTicker(event.target.value.toUpperCase())
  }

  const handleSearch = () => {
    props.getStock(ticker)
  }

  return (
    <div>
      <h3>Portfolio: ${cashBalance}</h3>
      <table>
        <tr>
          <th>Ticker Symbol</th>
          <th>Shares</th>
          <th>Current Value</th>
        </tr>
      </table>
      <div>
        <input
          name="ticker"
          type="text"
          placeholder="Ticker Symbol..."
          onChange={handleChange}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        {stockInfo.symbol === ticker ? <Stock stockInfo={stockInfo} /> : null}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  cashBalance: state.user.cashBalance,
  stockInfo: state.stock
})

const mapDispatch = dispatch => ({
  getStock: ticker => dispatch(getStock(ticker))
})

export default connect(mapState, mapDispatch)(Portfolio)
