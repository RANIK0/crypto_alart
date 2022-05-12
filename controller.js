var alerts = require("./alerts");
const currentPrice = require("./helpers/currentPriceBinance");
const { errorObject } = require("./config");
//require("./workers/removeExpired.js");
require("./workers/sendAlertVoice");


exports.CurrentPrice = async (req, res) => {

  try {

      let prices = await currentPrice();
      //console.log(prices);
      if (prices.error) return res.status(500).json(errorObject);
      return res.status(200).json({
            success: true,
            price_data: prices.data,
      });
  } catch (error) {
    return res.status(500).json(errorObject);
  }
};

exports.CreateAlert = async (req, res) => {
  try {
    const { asset, price, mobile, type } = req.body;
    //console.log(req.body);
    if (!asset || !price || !mobile || !type)   //Check whether all the fields are passed
      return res.status(400).json({
        error: true,
        message: "Please provide the required fields",
      });

    if (asset.toLowerCase() != "btc" && asset.toLowerCase() != "eth")
      return res.status(400).json({
        error: true,
        message: "You can set alerts for BTC and ETH only.",
      });

    // Create alert by pushing the object to the alerts array.
    alerts.push({
      asset: asset,
      price: price,
      mobile: mobile,
      type: type.toLowerCase(),
      createdAt: new Date().getTime()
    });
    console.log("alert created!");
    return res.send({ success: true, message: "Alert created" }); //Send response

  } catch (error) {
     return res.status(500).json(errorObject);
  }
};

exports.GetAlerts = async (req, res) => {
    return res.send({ success: true, alerts: alerts });
};


exports.UpdateAlerts = async (req ,res) => {
  alerts = req.body;
  res.send({ success: true, alerts: alerts });
};
