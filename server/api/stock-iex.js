const router = require('express').Router()
const axios = require('axios')
const IEX_API_KEY = process.env.IEX_API_KEY || require('../../secrets')
module.exports = router

router.get('/:ticker', async (req, res, next) => {
  try {
    const {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${
        req.params.ticker
      }&types=quote&range=1m&last=5&token=${IEX_API_KEY}`
    )
    const ticker = req.params.ticker.toUpperCase()
    const simpleData = {
      symbol: data[ticker].quote.symbol,
      company: data[ticker].quote.companyName,
      price: data[ticker].quote.iexRealtimePrice,
      previousClose: data[ticker].quote.previousClose,
      change: data[ticker].quote.changePercent
    }
    res.json(simpleData)
  } catch (error) {
    next(error)
  }
})

router.post('/prices', async (req, res, next) => {
  try {
    const {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${
        req.body.ticker
      }&types=quote&range=1m&last=5&token=${IEX_API_KEY}`
    )
    const tickerArr = req.body.ticker.split(',')
    let priceData = {}
    for (let ticker of tickerArr) {
      priceData[ticker] = {
        currentPrice: data[ticker].quote.iexRealtimePrice,
        previousClose: data[ticker].quote.previousClose
      }
    }
    res.json(priceData)
  } catch (error) {
    next(error)
  }
})
