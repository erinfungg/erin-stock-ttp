import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getStock} from '../store/stock'
import {getPortfolio} from '../store/portfolio'
import Stock from './stock-info'

export const Portfolio = props => {
  const [ticker, setTicker] = useState({})

  const {cashBalance, stockInfo} = props

  useEffect(() => {
    props.getPortfolio(props.user.id)
    console.log('PORTFOLIO INFO ON STATE', props.portfolio)
  }, [])

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
        {props.portfolio.map(stock => (
          <tr key={stock.id}>
            <td>{stock.ticker}</td>
            <td>{stock.quantityOwned}</td>
            <td />
          </tr>
        ))}
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

const mapState = state => ({
  user: state.user,
  cashBalance: state.user.cashBalance,
  stockInfo: state.stock,
  portfolio: state.portfolio
})

const mapDispatch = dispatch => ({
  getPortfolio: userId => dispatch(getPortfolio(userId)),
  getStock: ticker => dispatch(getStock(ticker))
})

export default connect(mapState, mapDispatch)(Portfolio)
