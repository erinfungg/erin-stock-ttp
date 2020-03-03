const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING
  },
  companyName: {
    type: Sequelize.STRING
  },
  shares: {
    type: Sequelize.INTEGER
  },
  priceAtPurchase: {
    type: Sequelize.FLOAT
  }
})

module.exports = Transaction
