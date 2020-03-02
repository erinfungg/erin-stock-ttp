import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/transactions'

const Transactions = props => {
  const {user, transactions} = props
  useEffect(() => {
    props.getTransactions(user.id)
  }, [])
  console.log('transactions on state: ', transactions)
  return (
    <div className="transactions-container">
      <h3>Transactions</h3>
      <table>
        <tr>
          <th>Ticker Symbol</th>
          <th>Shares Bought</th>
          <th>Price per Share</th>
        </tr>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.ticker}</td>
            <td>{transaction.shares}</td>
            <td>${(transaction.priceAtPurchase / 100).toFixed(2)}</td>
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
  //get all transactions thunk
  getTransactions: userId => dispatch(getTransactions(userId))
})

export default connect(mapState, mapDispatch)(Transactions)
