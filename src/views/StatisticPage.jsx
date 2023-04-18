import { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import Chart from '../cmps/Chart'

export default class StatisticPage extends Component {

    state = {
        marketPriceData:null,
        blockSize:null,
        labelsDays:null,
    }

    componentDidMount() {
        this.loadMarketPrice()
        this.loadConfirmedTransactions()
    }

    loadMarketPrice = async ()=> {
        const marketPrice = await bitcoinService.getMarketPrice() 
        const labelsDays = marketPrice.values.map(value=>this.convertMillisecondsToDateTime(value.x))
        const marketPriceData = marketPrice.values.map(value=>value.y)
        this.setState({marketPriceData, labelsDays})
    }

    loadConfirmedTransactions = async () => {
      try {
          const confirmedTransactions = await bitcoinService.getConfirmedTransactions()
          const blockSize = confirmedTransactions.values.map(value => value.y)
          this.setState({ blockSize })
      } catch (err) {
          console.error('error from getting market price:', err)
          return null
      }
  }

  convertMillisecondsToDateTime(milliseconds) {
    // Convert milliseconds to seconds
    var seconds = Math.floor(milliseconds / 1000);
  
    // Create a new Date object from seconds
    var date = new Date(seconds * 1000);
  
    // Get day, month, and abbreviated month name
    var day = date.getDate();
    var month = date.getMonth();
    var monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  
    // Get hour and format as two-digit string
    var hour = ('0' + date.getHours()).slice(-2);
  
    // Format date as "d Month HH:MM"
    var formattedDate = day + ' ' + monthAbbreviation + ' ' + hour + ':' + ('0' + date.getMinutes()).slice(-2);
  
    return formattedDate;
  }

  render() {
    const {marketPriceData, blockSize, labelsDays} = this.state
    if(!marketPriceData || !blockSize) return <div>Loading...</div> 
    return (
      <Chart labelsDays={labelsDays} marketPrice={marketPriceData} confirmedTransactions={blockSize}/>
    )
  }
}
