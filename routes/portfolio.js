const request = require('superagent');
const bodyParser = require('koa-body')();
const moment = require('moment');

module.exports = ({ portfolioRouter }) => { 
    portfolioRouter.post('/', bodyParser, async ctx => {

    let apikey =  ctx.request.body["apikey"]
    let datefrom = ctx.request.body['datefrom']
    let ownedStocks = ctx.request.body['stocks']

    let header = ['Ticker','Quantity','Current Price','High','Low','Current Value']
    let rows = []
    let footer = ['total',,,,,]

    //fake response 
    //ctx.body = {"portfolio":[["Ticker","Quantity","Current Price","High","Low","Current Value"],["CAKE",30,24.84,67.14,14.52,745.2],["total",null,null,null,null,745.2]]}

    for (const [ticker, quantity] of Object.entries(ownedStocks)){
        let currentStockResponse = {}
        let historicalStocks = {}
        await request
      .get(`https://financialmodelingprep.com/api/v3/quote-short/${ticker}?apikey=${apikey}`)
      .then(res => {
        currentStockResponse = res.body
      })
      .catch(err => {
        console.log(err);
      });

    await request
      .get(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${apikey}`)
      .then(res => {
        historicalStocks = res.body
      })
      .catch(err => {
        console.log(err)
      })
      rows.push(calculateStockInfo(currentStockResponse,historicalStocks,quantity,datefrom))
    }

    //after rows processed, calculate total value and combine
    if(rows.length > 0){
        let allvalues = rows.map(e=>e[5]).reduce((a, b) => a + b, 0)
        footer[5] = allvalues
      }
      rows.push(footer)
      rows.unshift(header)
      ctx.body = {"portfolio":rows}
    })
}

function calculateStockInfo(currentStock,Historical,quantity,datefrom){
    currentStock = currentStock[0]
    let currentValue = quantity * parseFloat(currentStock.price)
    let mformat = 'YYYY-MM-DD'
    let mdatefrom = moment(datefrom,mformat )

    historicalStocks = Historical.historical.filter(e=>moment(e.date,mformat) > mdatefrom)
    let highs = historicalStocks.map(e=>e.high)
    let lows = historicalStocks.map(e=>e.low)

    let portfolio = [currentStock.symbol,quantity,currentStock.price, Math.max.apply(null, highs),Math.min.apply(null, lows),currentValue] 
   return portfolio
}