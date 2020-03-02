const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (allTransactions) res.json(allTransactions)
    else res.json('No Transactions')
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      userId: req.user.id,
      ticker: req.body.ticker,
      shares: req.body.shares,
      priceAtPurchase: req.body.priceAtPurchase
    })
    console.log('DATA RETURNED FROM TRANSACTION: ', transaction)
    res.json(transaction)
  } catch (error) {
    next(error)
  }
})
