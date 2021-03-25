import React from 'react';
import scss from './App.module.scss';
import logo from '../src/assets/logo.png';
import Pokemons from './containers/Pokemons/Pokemons';

function App() {
  return (
    <div className={scss.App}>
      <img className={scss.logo} src={logo} alt="logo" />
      <Pokemons />
    </div>
  );
}

export default App;