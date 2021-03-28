import React from "react";
import scss from "./App.module.scss";
import logo from "../src/assets/logo.png";
import Pokemons from "./containers/Pokemons/Pokemons";
import { Container, Grid } from "@material-ui/core";

function App() {
  return (
    <Container className={scss.app}>
      <Grid container alignItems="flex-start" justify="center" spacing={2}>
        <Grid className={scss.logo} item xs={12}>
          <img src={logo} alt="logo" />
        </Grid>
        <Pokemons />
      </Grid >
    </Container >
  );
}

export default App;
