const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app'));

app.get('/',function(req, res){
  sendIndex(res);
});

app.post('/',function(req, res){
  console.log(req.body);
  fs.writeFileSync('app/request.json', JSON.stringify(req.body));
  sendIndex(res);
});

function sendIndex(res) {
  res.sendfile('app/index.html');
}

app.listen(PORT, function(){
  console.log(`Started on PORT ${PORT}`);
});
