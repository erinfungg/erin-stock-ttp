const Sequelize = require('sequelize')
const db = require('../db')

const Stocks = db.define('stock', {
  ticker: {
    type: Sequelize.STRING
  },
  quantityOwned: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Stocks
