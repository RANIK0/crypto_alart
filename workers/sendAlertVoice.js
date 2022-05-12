const CronJob = require("cron").CronJob;
const alerts = require("../alerts");
const config = require("../config");
const currentPrice = require("../helpers/currentPriceBinance");
var axios = require('axios');
var qs = require('qs');

var sendAlert = new CronJob("*/25 * * * * *",   // Execute every 25 seconds
async function () {

  const currentPrices = await currentPrice();
  if (currentPrices.error) return;

  let priceObj = {
    BTC: currentPrices.data.BTC,
    ETH: currentPrices.data.ETH,
  };

 //console.log(priceObj);

  alerts.forEach((alert,index) => {
    let message, title, recipient;
    if (
      alert.type == "above" &&
      parseFloat(alert.price) <= parseFloat(priceObj[alert.asset])
    ) {

      message = `Price of ${alert.asset} has just exceeded your alert price of ${alert.price} USD.
      Current price is ${priceObj[alert.asset]} USD.`;

      sendVoice(alert.mobile, message);
      console.log("Call send !");

      alerts.splice(index,1)  // remove the alert once pushed to the queue.

    } else if (
      alert.type == "below" &&
      parseFloat(alert.price) > parseFloat(priceObj[alert.asset])
    ) {
      message = `Price of ${alert.asset} fell below your alert price of ${alert.price}.
      Current price is ${priceObj[alert.asset]} USD.`;

      sendVoice(alert.mobile, message);
      console.log("Call send !");

      alerts.splice(index,1)  // remove the alert once pushed to the queue.
    }
  });
});

sendAlert.start();

function sendVoice(mobile,message){
var data = qs.stringify({
                        'api_key':'pSjibSQGpDYQVLCV5eUkPJrmr2PjRQYC-Ps_s7DWIESKtpOyZKAHD0az4c-nLGZY',
                        'caller_id': '7685964670',
                        'voice_source': 'voice_text',
                        'voice_text': message,
                        'voice_name': 'Aditi',
                        'mobile_no': mobile
                        });

axios.get(`https://obligr.io/api_v2/voice-call/campaign?${data}`).then((responce) =>
{
  console.log(responce.data);
}).catch((error) =>{
  console.log(error);
});
}
