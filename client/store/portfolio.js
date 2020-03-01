import axios from 'axios'

//ACTION TYPES
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const SAVED_PURCHASE = 'SAVED_PURCHASE'

//ACITON CREATORS
const gotPortfolio = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})
const savedPurchase = newStock => ({
  type: SAVED_PURCHASE,
  newStock
})

//THUNKS
export const getPortfolio = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/portfolio`)
    console.log('PORTFOLIO DATA FROM THUNK: ', data)
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.log('error getting portfolio')
  }
}

export const savingPurchase = (userId, info) => async dispatch => {
  try {
    console.log('INFO IN SAVINGPURCHASE THUNK', info)
    const {data} = await axios.post(`/api/users/${userId}/portfolio`, info)
    console.log('RETURNED NEW PURCHASE DATA: ', data)
    dispatch(getPortfolio(userId))
  } catch (error) {
    console.log('error saving purchase: ', error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return action.portfolio
    // case SAVED_PURCHASE:
    // 	const stateToUpdate = state.filter(stockObj => stockObj.ticker === action[stockObj.ticker])

    //   return state
    default:
      return state
  }
}
