import axios from 'axios'

//ACTION TYPES
const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'

//ACTION CREATOR
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})

//THUNKS
export const getTransactions = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/transactions`)
    dispatch(gotTransactions(data))
  } catch (error) {
    console.log('error getting transactions: ', error)
  }
}

export const savingTransaction = (userId, info) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/transactions`, info)
  } catch (error) {
    console.log('error saving transaction: ', error)
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
