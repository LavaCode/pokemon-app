import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './App.css';

const debugMode = true;
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
    <div>
      {loading && <p>Data wordt opgehaald...</p>}
      <ul>
          {pokemons && pokemons.map((pokemon) => (
          <li>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
