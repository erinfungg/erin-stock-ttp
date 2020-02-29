import axios from 'axios'

const API_KEY = 'DITHX3KA0NAN5NOZ'

//ACTION TYPES
const GOT_STOCK = 'GOT_STOCK'
const SAVED_PURCHASE = 'SAVED_PURCHASE'

//ACTION CREATORS
const gotStock = stockInfo => ({
  type: GOT_STOCK,
  stockInfo
})

const savedPurchase = () => ({
  type: SAVED_PURCHASE
})

//THUNKS
export const getStock = ticker => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    )
    const simpleData = {
      symbol: data['Global Quote']['01. symbol'],
      open: data['Global Quote']['02. open'],
      high: data['Global Quote']['03. high'],
      low: data['Global Quote']['04. low'],
      price: data['Global Quote']['05. price'],
      previousClose: data['Global Quote']['08. previous close'],
      change: data['Global Quote']['09. change']
    }
    dispatch(gotStock(simpleData))
  } catch (error) {
    console.log('error getting stock information: ', error)
  }
}

export const savingPurchase = (userId, info) => async dispatch => {
  try {
    console.log('INFO IN SAVINGPURCHASE THUNK', info)
    const {data} = await axios.post(`/api/users/${userId}/portfolio`, info)
    console.log(data)
    // dispatch(savedPurchase(data))
  } catch (error) {
    console.log('error saving purchase: ', error)
  }
}

//REDUCER

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_STOCK:
      return action.stockInfo
    default:
      return state
  }
}
