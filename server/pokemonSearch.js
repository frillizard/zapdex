var request = require('request');

const pokemonSearch = (pokemon, callback) => {
  let options = {
    url: `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`,
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
    callback(null, newPokemon);
  });
}

module.exports.pokemonSearch = pokemonSearch;