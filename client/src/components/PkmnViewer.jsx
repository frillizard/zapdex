import React from 'react';

const PokemonViewer = ({pokemon: {name, id, genus, flavor_text}, shiny, toggleShiny}) => {
  let neatID = '#000';
  let pkmnName = '';
  let pkmnFlavorText = [];
  let pkmnGenus = '';

  if (name) {
    if (id < 10) {
      neatID = neatID.slice(0,3) + id;
    } else if (id < 100) {
      neatID = neatID.slice(0,2) + id;
    } else {
      neatID = `#${id}`;
    }
    pkmnName = ' - ' + name[0].toUpperCase() + name.slice(1);
    pkmnGenus = ' - The ' + genus;
    pkmnFlavorText = flavor_text.split('\n');
  }

  return (
    <div className='infoContainer'>
      <img className='image' onClick={()=> toggleShiny()} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shiny}${id}.png`}></img>
      <div className='text'>{neatID}{pkmnName}{pkmnGenus}</div>
      <div>
      {/* {types.map((t => {
        let type = t.type.name
        return type[0].toUpperCase() + type.slice(1) + ' ';
      }))} */}
      </div>
      <div className='text'>{pkmnFlavorText.map((text, i) => {
        return <div key={i}> {text} </div>;
      })}</div>
    </div>
  )
}

export default PokemonViewer;