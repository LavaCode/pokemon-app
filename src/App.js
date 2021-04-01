import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemons from './components/Pokemons';
import './App.css';

const debugMode = false;
debugMode && console.log('-- Debug App is ACTIVATED --');

function App() {
  const [pokemons, setPokemons] = useState([])
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
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
      debugMode && console.log(result.data);
      setPokemons(result.data.results);
      debugMode && console.log(pokemons);
    }

  return (
    <>
      <div>
            {pokemons && pokemons.map((pokemon) => {
              <p>{pokemon.name}</p>
              return (
                <Pokemons name={pokemon.name}/>
              )
              })}
      </div>
    </>
  );
}

export default App;
