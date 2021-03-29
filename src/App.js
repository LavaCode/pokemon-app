import React, { useState, useEffect  } from 'react';
import Buttons from './components/PageButton';
import axios from 'axios';
import './App.css';

const debugMode = false;
debugMode && console.log('-- Debug mode is ACTIVATED --');

function App() {
  const [pokemons, setPokemons] = useState([])
  const [error, setError] = useState('');
  const [loading, toggleLoading] = useState(false);

  async function fetchData() {
    const result = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    debugMode && console.log(result.data)
    setPokemons(result.data.results)
    debugMode && console.log(pokemons)
  }

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

  return (
    <>
    <div>
      {loading && (<p>Data wordt opgehaald...</p>)}
      <Buttons name="vorige"/>
      <Buttons name="volgende"/>
      <ul>
          {pokemons && pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>

    {error && (<span>Ho! er gaat iets fout hier </span>)}
    </>
  );
}

export default App;
