const router = require('express').Router()
const {User, Stocks} = require('../db/models')
module.exports = router

//get the user's portfolio
router.get('/', async (req, res, next) => {
  try {
    const userStocks = await Stocks.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (userStocks) res.json(userStocks)
    else res.json('No stocks')
  } catch (error) {
    next(error)
  }
})

//create or update if ticker already exists for user
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const stock = await Stocks.findOrCreate({
      where: {userId: req.user.id, ticker: req.body.ticker}
    })
    console.log(stock)
    stock[0].quantityOwned += +req.body.shares
    await stock[0].save()
    console.log('STOCK INSTANCE FROM ROUTE: ', stock)
    res.json(stock[0])
  } catch (error) {
    next(error)
  }
})
