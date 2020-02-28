const Sequelize = require('sequelize')
const db = require('../db')

const Stocks = db.define('stock', {
  ticker: {
    type: Sequelize.STRING
  },
  quantityOwned: {
    type: Sequelize.INTEGER
  }
})

module.exports = Stocks
