import axios from 'axios'

const API_KEY = 'DITHX3KA0NAN5NOZ'

//ACTION TYPES
const GOT_CURRENT_PRICE = 'GOT_CURRENT_PRICE'
const GOT_STOCK = 'GOT_STOCK'

//ACTION CREATORS
const gotCurrentPrice = price => ({
  type: GOT_CURRENT_PRICE,
  price
})
const gotStock = stockInfo => ({
  type: GOT_STOCK,
  stockInfo
})

//THUNKS
export const getCurrentPrice = ticker => async dispatch => {
  try {
    const {data} = await axios.post(`/api/stocks/prices`, {ticker})
    dispatch(gotCurrentPrice(data))
  } catch (error) {
    console.log('error getting the current price: ', error)
  }
}

export const getStock = ticker => async dispatch => {
  try {
    const {data} = await axios.get(`/api/stocks/${ticker}`)
    dispatch(gotStock(data))
  } catch (error) {
    console.log('error getting stock information: ', error)
  }
}

//INITIAL STATE
const initialState = {
  stockInfo: {},
  prices: {}
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CURRENT_PRICE:
      return {...state, prices: {...state.prices, ...action.price}}
    case GOT_STOCK:
      return {...state, stockInfo: action.stockInfo}
    default:
      return state
  }
}
