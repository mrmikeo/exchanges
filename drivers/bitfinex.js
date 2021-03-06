const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const tickers = await request('https://api.bitfinex.com/v1/tickers');

  return tickers.map((ticker) => {
    const pair = /^([A-Z]*)(USD|BTC|EUR|JPY|ETH|GBP|DAI|EOS|XLM)$/.exec(ticker.pair);
    if (!pair) return undefined;
    const [, base, quote] = pair;

    return new Ticker({
      base,
      quote,
      baseVolume: parseToFloat(ticker.volume),
      close: parseToFloat(ticker.last_price),
      high: parseToFloat(ticker.high),
      low: parseToFloat(ticker.low),
    });
  });
};
