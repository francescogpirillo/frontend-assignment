import React from "react";
import scss from "./App.module.scss";
import logo from "../src/assets/logo.png";
import Pokemons from "./containers/Pokemons/Pokemons";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Container className={scss.app}>
      <img className={scss.logo} src={logo} alt="logo" />
      <Pokemons />
    </Container>
  );
}

export default App;
