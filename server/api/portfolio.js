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
    const stock = await Stocks.findOrCreate({
      where: {
        userId: req.user.id,
        ticker: req.body.ticker,
        companyName: req.body.company
      }
    })
    stock[0].quantityOwned += +req.body.shares
    await stock[0].save()
    res.json(stock[0])
  } catch (error) {
    next(error)
  }
})
