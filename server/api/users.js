const router = require('express').Router()
const {User} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

router.use('/:id/portfolio', checkUser, require('./portfolio'))
router.use('/:id/transactions', checkUser, require('./transaction'))

router.put('/:id', checkUser, async (req, res, next) => {
  try {
    const updatedUser = await User.findByPk(req.user.id)
    updatedUser.cashBalance -= +req.body.shares * req.body.priceAtPurchase

    await updatedUser.save()

    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
