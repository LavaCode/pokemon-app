import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Pokemons.css';

const debugApi = false; 
debugApi && console.log(` -- DEBUG POKEMON ACTIVATED -- `)

function Pokemons({name}) {
    const [pokemonsDetails, setPokemonsDetails] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [weight, setWeight] = useState(0);
    const [loading, toggleLoading] = useState(false); 
    const [newData, toggleNewData] = useState(false);

    useEffect(() => {
      try { 
        fetchData();
      } 
      catch(e) {
        console.error(e);
      } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData])
  
    async function fetchData() {
      toggleNewData(false);
      toggleLoading(true);
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      toggleLoading(false);
      setPokemonsDetails(result.data);
      setAbilities(result.data.abilities);
      setMoves(result.data.moves);
      setWeight(result.data.weight);
      debugApi && console.log(`Name: ${pokemonsDetails.name}`);
      debugApi && console.log(`Abilities: ${abilities.length}`);
      debugApi && console.log(`Moves: ${moves.length}`);
      debugApi && console.log(`Weight: ${weight}`);
    }

    return(
      <>
        <div className="pokemon-card">
          {loading && <span class="loading-data">Data wordt geladen...</span>}
          <img className="pokemon-sprite" alt="Pokemon character" src={pokemonsDetails.sprites?.front_shiny} />
          <p className="pokemon-name">{pokemonsDetails.name}</p>
          <p className="pokemon-moves"><strong>Moves:</strong> {moves.length}</p>
          <p className="pokemon-weight "><strong>Weight: </strong>{weight}</p>
          <p className="pokemon-ability-title">Abilties:</p>
            {abilities && abilities.map((pokemonAbilities)=> {
              return <span className="pokemon-ability" key={pokemonAbilities.ability.name}>{pokemonAbilities.ability.name}</span>
            })}
        </div>
      </>
    );
}

export default Pokemons;