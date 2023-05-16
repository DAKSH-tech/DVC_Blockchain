const express = require("express");
const app = express();
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const path = require('path');
const port = 8000;
//must include to get path globally of public
app.use('/public',express.static(__dirname + '/public'));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/Home.html"));
})
app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname + "/Result.html"));
})
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
