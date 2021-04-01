import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemons from './components/Pokemons';
import logo from './assets/Pokemon-Emblem.jpeg';
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
      <header>
        <img  className="logo-header" alt="Pokemon Logo" src={logo}/>
      </header>
      <div className="card-container">
            {pokemons && pokemons.map((pokemon) => {
              return (
                <Pokemons name={pokemon.name}/>
              )
              })}
      </div>
      {loading && <p>Data wordt geladen...</p>}
        {error && <p>Whoops, we hebben een probleempje!</p>}
    </>
  );
}

export default App;
