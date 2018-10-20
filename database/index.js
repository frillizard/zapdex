var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pokemon', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let pokemonSchema = mongoose.Schema({
  name: String,
  id: Number,
  genus: String,
  flavor_text: String,
  evolution_chain: Object
});

let Pokemon = mongoose.model('Pokemon', pokemonSchema);

let flavorText = (pkmn) => {
  return pkmn.flavor_text_entries[1].language.name !== 'en' ?
    pkmn.flavor_text_entries[2].flavor_text : 
    pkmn.flavor_text_entries[1].flavor_text
}

let save = (pkmn, callback) => {
  let newPokemonObject = new Pokemon({
      name: pkmn.name,
      id: pkmn.id,
      genus: pkmn.genera[2].genus,
      flavor_text: flavorText(pkmn),
      evolution_chain: pkmn.evolution_chain
  });
  Pokemon.findOneAndUpdate(
    {id: newPokemonObject.id},
    newPokemonObject,
    {upsert: true},
    (err, pokemon) => {
      if (err) {
        throw err;
      }
      callback(null, pokemon);
    }
  );
}

let find = (search, callback) => {
  if (!isNaN(search)) {
    Pokemon.findOne({'id': Number(search)}, (err, pokemon) => {
      if (err) {
        throw err;
      }
      callback(null, pokemon);
    });
  } else {
    Pokemon.findOne({name: search}, (err, pokemon) => {
      if (err) {
        throw err;
      }
      callback(null, pokemon);
    });
  }
}

module.exports.save = save;
module.exports.find = find;