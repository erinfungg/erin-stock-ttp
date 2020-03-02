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
    const {data} = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    )
    const price = {
      [ticker]: {
        currentPrice: data['Global Quote']['05. price'],
        openPrice: data['Global Quote']['02. open']
      }
    }
    console.log('prices: ', price)
    dispatch(gotCurrentPrice(price))
  } catch (error) {
    console.log('error getting the current price: ', error)
  }
}

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
