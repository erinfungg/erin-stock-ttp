import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/transactions'

const Transactions = props => {
  const {user, transactions} = props
  useEffect(() => {
    props.getTransactions(user.id)
  }, [])

  return (
    <div className="transactions-container">
      <h2 style={{padding: '0px 25px'}}>Transactions</h2>
      <table className="transactions-table">
        <tr>
          <th>Ticker Symbol</th>
          <th>Company</th>
          <th>Shares Bought</th>
          <th>$/share</th>
          <th>Date</th>
        </tr>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.ticker}</td>
            <td>{transaction.companyName}</td>
            <td>{transaction.shares}</td>
            <td>${(transaction.priceAtPurchase / 100).toFixed(2)}</td>
            <td>{transaction.createdAt.slice(0, 10)}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  transactions: state.transactions
})

const mapDispatch = dispatch => ({
  getTransactions: userId => dispatch(getTransactions(userId))
})

export default connect(mapState, mapDispatch)(Transactions)
