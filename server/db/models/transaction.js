const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('user', {
  stock: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  }
})

module.exports = Transaction
