// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();
const fetch = require("cross-fetch");
const bodyParser = require('body-parser');

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

app.use(express.json());
app.use(bodyParser.text());

app.post("/query/Dixie", async function(req, res) {
  console.log("sending Dixie");
	console.log(req.body);
	let cummers = await APICALL(req.body.month, req.body.year);
  res.json(cummers);  
});

// No static server or /public because this server
// is only for AJAX requests

// respond to all AJAX querires with this message
app.use(function(req, res, next) {
  res.json({msg: "No such AJAX request"})
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function APICALL(month, year) {
	const api_url =  "https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=" + year + "-" + month + "&End=" + year + "-" + month;
  // send it off
  let fetchResponse = await fetch(api_url);
  let data = await fetchResponse.json();
	ans = {'Shasta' : data[0].value, 'Oroville' : data[1].value, 'Trinity' : data[2].value, 'Melones' : data[3].value, 'Luis' : data[4].value, 'Pedro' : data[5].value, 'Berryessa' : data[6].value};
	console.log(ans);
  return ans;
}

