const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const pokemonSearch = require('./pokemonSearch').pokemonSearch;

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/pokemon', function (req, res) {
  let searchQuery = req._parsedOriginalUrl.query;
  pokemonSearch(searchQuery, (err, pokemon) => {
    if (err) {
      throw err;
    }
    res.send(pokemon);
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

