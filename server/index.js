var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/pokemon', function (req, res) {

  res.send('server says: hi');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

