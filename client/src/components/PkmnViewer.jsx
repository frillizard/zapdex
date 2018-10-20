import React from 'react';

const PokemonViewer = ({pokemon: {name, id, genus, flavor_text}, shiny, toggleShiny}) => {
  let neatID = '#000';
  if (id < 10) {
    neatID = neatID.slice(0,3) + id;
  } else if (id < 100) {
    neatID = neatID.slice(0,2) + id;
  } else {
    neatID = `#${id}`;
  }
  return (
    <div>
      <img onClick={()=> toggleShiny()} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shiny}${id}.png`}></img>
      <div>{neatID} - {name[0].toUpperCase() + name.slice(1)} - The {genus}</div>
      <div>
      {/* {types.map((t => {
        let type = t.type.name
        return type[0].toUpperCase() + type.slice(1) + ' ';
      }))} */}
      </div>
      <br></br>
      <div>{flavor_text.split('\n').map((text, i) => {
        return <div key={i}> {text} </div>;
      })}</div>
    </div>
  )
}

export default PokemonViewer;