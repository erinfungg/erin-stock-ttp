import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getStock, getCurrentPrice} from '../store/stock'
import {getPortfolio} from '../store/portfolio'
import Stock from './StockInfo'

export const Portfolio = props => {
  const {cashBalance, stockInfo, portfolio, currPrices, user} = props
  const [ticker, setTicker] = useState({})

  useEffect(() => {
    props.getPortfolio(user.id)
  }, [])

  useEffect(
    () => {
      portfolio.forEach(stock => {
        props.getCurrentPrice(stock.ticker)
      })
    },
    [portfolio]
  )

  const handleChange = event => {
    setTicker(event.target.value.toUpperCase())
  }

  const handleSearch = () => {
    props.getStock(ticker)
  }

  return (
    <div>
      <h3>Portfolio: ${(cashBalance / 100).toFixed(2)}</h3>
      <table>
        <tr>
          <th>Ticker Symbol</th>
          <th>Shares</th>
          <th>Current Value</th>
        </tr>
        {portfolio.map(stock => (
          <tr key={stock.id}>
            <td>{stock.ticker}</td>
            <td>{stock.quantityOwned}</td>
            {Object.keys(currPrices).length === portfolio.length ? (
              <td>
                ${(+currPrices[stock.ticker] * stock.quantityOwned).toFixed(2)}
              </td>
            ) : (
              'Calculating...'
            )}
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
        {stockInfo.symbol === ticker ? (
          <Stock
            stockInfo={stockInfo}
            user={user}
            cashBalance={cashBalance}
            currPrices={currPrices}
          />
        ) : null}
      </div>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  cashBalance: state.user.cashBalance,
  stockInfo: state.stock.stockInfo,
  portfolio: state.portfolio,
  currPrices: state.stock.currPrices
})

const mapDispatch = dispatch => ({
  getPortfolio: userId => dispatch(getPortfolio(userId)),
  getStock: ticker => dispatch(getStock(ticker)),
  getCurrentPrice: ticker => dispatch(getCurrentPrice(ticker))
})

export default connect(mapState, mapDispatch)(Portfolio)
