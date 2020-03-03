import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getStock, getCurrentPrice} from '../store/stock'
import {getPortfolio} from '../store/portfolio'
import Stock from './StockInfo'

export const Portfolio = props => {
  const {cashBalance, stockInfo, portfolio, prices, user} = props
  const [ticker, setTicker] = useState({})

  useEffect(() => {
    props.getPortfolio(user.id)
    const interval = setInterval(() => {
      console.log('getting portfolio')
      props.getPortfolio(user.id)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(
    () => {
      if (portfolio.length) {
        const tickerArray = portfolio.map(stock => stock.ticker)
        const tickerList = tickerArray.join(',')
        props.getCurrentPrice(tickerList)
      }
    },
    [portfolio]
  )

  const handleChange = event => {
    setTicker(event.target.value.toUpperCase())
  }

  const handleSearch = () => {
    props.getStock(ticker)
  }

  const colorDisplay = stock => {
    if (Object.keys(prices).length === portfolio.length) {
      if (
        +prices[stock.ticker].currentPrice > +prices[stock.ticker].previousClose
      )
        return 'green'
      else if (
        +prices[stock.ticker].currentPrice < +prices[stock.ticker].previousClose
      )
        return 'red'
      else return 'grey'
    }
    return 'grey'
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        <h3 id="portfolio-title">
          Portfolio: ${(cashBalance / 100).toFixed(2)}
        </h3>
        <table className="portfolio-table">
          <tr>
            <th>Ticker Symbol</th>
            <th>Company</th>
            <th>Shares</th>
            <th className="column-padding">Current Value</th>
          </tr>
          {portfolio.map(stock => (
            <tr key={stock.id}>
              <td
                style={{
                  color: colorDisplay(stock)
                }}
              >
                {stock.ticker}
              </td>
              <td>{stock.companyName}</td>
              <td>{stock.quantityOwned}</td>
              {Object.keys(prices).length === portfolio.length ? (
                <td className="column-padding">
                  $
                  {(
                    +prices[stock.ticker].currentPrice * stock.quantityOwned
                  ).toFixed(2)}
                </td>
              ) : (
                'Calculating...'
              )}
            </tr>
          ))}
        </table>
      </div>
      <div className="stock-component width50">
        <div className="search">
          <input
            name="ticker"
            type="text"
            placeholder="Ticker Symbol..."
            onChange={handleChange}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {stockInfo.symbol === ticker ? (
          <Stock stockInfo={stockInfo} user={user} cashBalance={cashBalance} />
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
  prices: state.stock.prices
})

const mapDispatch = dispatch => ({
  getPortfolio: userId => dispatch(getPortfolio(userId)),
  getStock: ticker => dispatch(getStock(ticker)),
  getCurrentPrice: ticker => dispatch(getCurrentPrice(ticker))
})

export default connect(mapState, mapDispatch)(Portfolio)
