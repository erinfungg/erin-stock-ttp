const router = require('express').Router()
const {User} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

router.use('/:id/portfolio', checkUser, require('./portfolio'))
// router.use('/:id/transactions', checkUser, require('./transaction'))

//updates user's cash balance
router.put('/:id', checkUser, async (req, res, next) => {
  try {
    console.log('REQ.BODY: ', req.body)
    const updatedUser = await User.findByPk(req.user.id)
    updatedUser.cashBalance -= +req.body.shares * req.body.priceAtPurchase

    await updatedUser.save()
    console.log('UPDATED USER: ', updatedUser)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
