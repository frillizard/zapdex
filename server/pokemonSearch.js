var request = require('request');

const pokemonSearch = (pokemon, callback) => {
  let options = {
    url: `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, (err, response, body) => {
    callback(null, JSON.parse(body));
  });
}

module.exports.pokemonSearch = pokemonSearch;