import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Pokemons.css';

const debugApi = true; 
debugApi && console.log(` -- DEBUG API ACTIVATED -- `)

function Pokemons({name}) {
    const [pokemonsDetails, setPokemonsDetails] = useState([])
    const [abilities, setAbilities] = useState([])
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false); 

    useEffect(() => {
      setError('');
      toggleLoading(true);
      try { 
        fetchData();
      } 
      catch(e) {
        console.error(e);
        setError(e.message);
      } 
      toggleLoading(false);
    }, [])
  
    async function fetchData() {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemonsDetails(result.data);
      setAbilities(result.data.abilities);
      console.log(result.data);
    }

    return(
      <>
        <div className="pokemon-card">
          <img src={pokemonsDetails.sprites?.front_shiny} />
          <p className="pokemon-name">{pokemonsDetails.name}</p>
          <ul>
            {abilities && abilities.map((pokemonAbilities)=> {
              return <li className="ability" key={pokemonAbilities.ability.name}>{pokemonAbilities.ability.name}</li>
            })}
          </ul>
        </div>
        {loading && <p>Data wordt geladen...</p>}
        {error && <p>Whoops, we hebben een probleempje!</p>}
      </>
    );
}

export default Pokemons;