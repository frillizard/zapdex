var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/pokemon', function (req, res) {
  let searchQuery = req._parsedOriginalUrl.query;
  let options = {
    url: `https://pokeapi.co/api/v2/pokemon-species/${searchQuery}`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, (err, response, body) => {
    body = JSON.parse(body);
    let flavorText = () => {
      return body.flavor_text_entries[1].language.name !== 'en' ?
        body.flavor_text_entries[2].flavor_text : 
        body.flavor_text_entries[1].flavor_text
    }
    let newPokemon = {
        "name": body.name,
        "id": body.id,
        "genus": body.genera[2].genus,
        "flavor_text": flavorText(),
        "evolution_chain": body.evolution_chain
    }
    // console.log(newPokemon);
    res.send(newPokemon);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

