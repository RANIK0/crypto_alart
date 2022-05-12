
updatePrice("btc",2);
updatePrice("bnb",2);
updatePrice("eth",2);
updatePrice("doge",4);
updatePrice("matic",4);
updatePrice("shib",7);
updatePrice("sol",2);
updatePrice("ada",4);
updatePrice("luna",2);



function updatePrice(symbol,cut){
  //console.log(symbol);
  let url = 'wss://stream.binance.com:9443/ws/' + symbol + 'usdt@trade';
  let ws = new WebSocket(url);
  ws.onmessage = (event) => {
    let priceObj = JSON.parse(event.data);
    let price = parseFloat(priceObj.p).toFixed(cut);
    //console.log(price);
    document.getElementById(symbol).innerHTML =  price;
  };
};


saveAlert = async () => {
    try{
      let coin = form.elements[0].value;
      let price = form.elements[1].value;
      let type = form.elements[2].value;
      let mobile = form.elements[3].value;
      let url = "api/alert";
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      }
      const postData = `asset=${coin}&mobile=${mobile}&price=${price}&type=${type}`;
      const resp =  await axios.post(url,postData,{headers: headers});
      //const poolObj = jsonConv(resp.data);
      //console.log(resp.config.url);
      return {
        error : false,
        data : {
                  statusText : resp.statusText,
                  url : resp.config.url,
                  data : resp.config.data
                }
      };
    }
    catch(error){
      return { error : true };
    }
};





const form = document.getElementById("form");

form.addEventListener("submit",(event) => {
    event.preventDefault();
    const alerts = saveAlert();
    alerts.then(function(result) {
      if(result.data.statusText == 'OK'){
          $(".alert").html("Alert Set Successfully !").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert").slideUp(500);
          });
      }
       console.log(JSON.stringify(result.data)) // "Some User token"
    })
})
