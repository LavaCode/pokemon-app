import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemons from './components/PokemonCard/Pokemons';
import Button from './components/Navigation/Buttons';
import logo from './assets/Pokemon-Emblem.jpeg';
import './App.css';

const debugMode = true;
debugMode && console.log('-- DEBUG APP IS ACTIVATED --');

function App() {
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');
  const [loading, toggleLoading] = useState(false); 

    useEffect(() => {
      setError('');
      async function fetchData() {
        try {
          toggleLoading(true);
          const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
          toggleLoading(false);
          setPokemons(result.data.results);
          debugMode && console.log(pokemons);
        } catch(e) {
          toggleLoading(false);
          setError(e);
          debugMode && console.error(`Probleem: ${e.response}`);
        }
      }
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

  return (
    <>
      <header>
        <img  className="logo-header" alt="Pokemon main Logo" src={logo}/>
      </header>
      
      <div className="navigation-buttons">
        {/* <Button name="Volgende pagina" changeOffset={offset => alert(offset)}/> */}
        <Button name="Volgende pagina" changeOffset={offset => setOffset(offset)} />
        <Button name="Vorige pagina" changeOffset={offset => setOffset(offset)} />
      </div>
      <div className="card-container">
            {pokemons && pokemons.map((pokemon) => {
              return (
                <Pokemons key={pokemon.name} name={pokemon.name}/>
              )
              })}
      </div>

      {loading && <span className="loading-data">Data wordt geladen...</span>}
      {error && <span className="error-message">Whoops! Er is iets misgegaan! Probeer het later opnieuw!</span>}
    </>
  );
}

export default App;
