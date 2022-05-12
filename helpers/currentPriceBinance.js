const axios = require("axios");

module.exports = async () => {

  try {
      let url ="https://api.binance.com/api/v1/ticker/allPrices";
      const resp = await axios.get(url);
      return {
          error: false,
          data: {
                  BTC: parseFloat(resp.data[11].price).toFixed(2),
                  ETH: parseFloat(resp.data[12].price).toFixed(2)
                },
            };
        } catch (error) {
          return { error: true};
          }
      };
