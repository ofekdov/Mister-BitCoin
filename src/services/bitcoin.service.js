import axios from 'axios'
import { storageService } from './storage.service'

const BLOCK_SIZE_KEY = 'blockSizeDB'
export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
}



async function getRate(coins) {
  let rate = storageService.load('rate')
  if (rate) return rate.data
  const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`

  try {
    const rate = await axios({
      method: 'get',
      url,
    })
    storageService.store('rate', rate)
    return rate.data
  } catch (err) {
    console.log('error rate', err)
  }
}

async function getMarketPrice() {
  let marketPrice = storageService.load('marketPrice')
  if(marketPrice) return marketPrice.data
  const url = `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
  try {
    const marketPrice = await axios({
      method: 'get',
      url,
    })
    storageService.store('marketPrice', marketPrice)
    return marketPrice.data
  } catch (err) {
    console.log('error marketPrice', err)
  }
}

async function getConfirmedTransactions() {
  const blockSizeFromStorage = storageService.load(BLOCK_SIZE_KEY)
  if (blockSizeFromStorage) return blockSizeFromStorage
  try {
       const response = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
       const data = response.data
       storageService.store(BLOCK_SIZE_KEY, data)
       return data
  } catch (err) {
       console.error('Error getting block size:', err)
       return null
  }
}
