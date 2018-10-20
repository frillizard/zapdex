var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/pokemon', function (req, res) {
  let searchQuery = req._parsedOriginalUrl.query;
  // console.log(req);
  res.send(searchQuery);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

