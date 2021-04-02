import React, { useEffect, useState } from "react";
import PokemonList from "../../components/PokemonList/PokemonList";
import ShowMore from "../../components/ShowMore/ShowMore";
import Scroll from "../../components/Scroll/Scroll";
import { Grid, CircularProgress, Snackbar } from "@material-ui/core";
import Search from "../../components/Search/Search";
import pokemonService from "../../apolloClient/pokemons/pokemons";
import { Pokemon } from '../../shared/models/Pokemon'
import { PokemonEdge } from "../../apolloClient/pokemons/models/pokemonsResponse";
import { Alert } from '@material-ui/lab';
import { nanoid } from "nanoid";

const Pokemons = () => {
  const fetchLimit: number = 8;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const fetchPokemons = async (name: string = '', after: string = '', showMore: boolean = false, limit: number = fetchLimit) => {
    try {
      if (!showMore) setLoadingResults(true);
      const response = await pokemonService.pokemonsByName(name, after, limit);
      if (response.data) {
        const pokemons: Pokemon[] = response.data.pokemons?.edges?.map((pokemon: PokemonEdge) => {
          const id = pokemon.node?.id ?? nanoid();
          const name = pokemon.node?.name ?? '';
          const types = pokemon.node?.types?.join() ?? '';
          const classification = pokemon?.node?.classification ?? '';
          return new Pokemon(id, name, types, classification);
        });
        showMore ? setPokemonList(pokemonList.concat(pokemons)) : setPokemonList(pokemons);
        setHasNextPage(response.data.pokemons?.pageInfo?.hasNextPage);
        setEndCursor(response.data.pokemons?.pageInfo?.endCursor);
      }
    } catch (err) {
      setOpenAlert(true);
    } finally {
      setLoadingResults(false);
    };
  };

  const fetchPokemonsByType = async (type: string, after: string = '', showMore: boolean = false, limit: number = fetchLimit) => {
    try {
      if (!showMore) setLoadingResults(true);
      const response = await pokemonService.pokemonsByType(type, after, limit);
      if (response.data) {
        const pokemons = response.data.pokemonsByType?.edges?.map((pokemon: PokemonEdge) => {
          const id = pokemon.node?.id ?? nanoid();
          const name = pokemon.node?.name ?? '';
          const types = pokemon.node?.types?.join() ?? '';
          const classification = pokemon.node?.classification ?? '';
          return new Pokemon(id, name, types, classification);
        });
        showMore ? setPokemonList(pokemonList.concat(pokemons)) : setPokemonList(pokemons);
        setHasNextPage(response.data.pokemonsByType?.pageInfo?.hasNextPage);
        setEndCursor(response.data.pokemonsByType?.pageInfo?.endCursor);
      }
    } catch (err) {
      setOpenAlert(true);
    } finally {
      setLoadingResults(false);
    };
  };

  const fetchPokemonsByFilters = async (type: string, name: string, after: string = '', showMore: boolean = false, limit: number = fetchLimit) => {
    try {
      if (!showMore) setLoadingResults(true);
      const response = await pokemonService.pokemonsByFilters(type, name, after, limit);
      if (response.data) {
        const pokemons = response.data.pokemonsByFilters?.edges?.map((pokemon: PokemonEdge) => {
          const id = pokemon.node?.id ?? nanoid();
          const name: string = pokemon.node?.name ?? '';
          const types: string = pokemon.node?.types?.join() ?? '';
          const classification: string = pokemon?.node?.classification ?? '';
          return new Pokemon(id, name, types, classification);
        });
        showMore ? setPokemonList(pokemonList.concat(pokemons)) : setPokemonList(pokemons);
        setHasNextPage(response.data.pokemonsByFilters?.pageInfo?.hasNextPage);
        setEndCursor(response.data.pokemonsByFilters?.pageInfo?.endCursor);
      }
    } catch (err) {
      setOpenAlert(true);
    } finally {
      setLoadingResults(false);
    };
  };

  useEffect(() => {
    fetchPokemons();
  }, [])

  useEffect(() => {
    pokemonService.pokemonTypes().then((response) => {
      setPokemonTypes(response.data?.pokemonTypes);
    })
  }, [])

  const onSearchHandler = (
    name: string = '',
    type: string = '',
    after: string = '',
    showMore: boolean = false
  ) => {

    if (!showMore) {
      setName(name);
      setType(type);
    }

    if (!type || type === '') {
      fetchPokemons(name, after, showMore);
    } else if (type && type !== '' && (!name || name === '')) {
      fetchPokemonsByType(type, after, showMore);
    } else if (type && type !== '' && name && name !== '') {
      fetchPokemonsByFilters(type, name, after, showMore);
    }
  };

  const onShowMoreHandler = () => {
    onSearchHandler(name, type, endCursor, true);
  }

  const closeAlertHandler = () => {
    setOpenAlert(false);
  };

  const errorAlert = (
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={closeAlertHandler}>
      <Alert onClose={closeAlertHandler} severity="error">
        An unexpected error occurred. Please try again later
        </Alert>
    </Snackbar>
  )

  return (
    <>
      {errorAlert}
      <Scroll showBelow={250} />
      <Grid container item xs={12} sm={3}>
        <Search onSearch={onSearchHandler} pokemonTypes={pokemonTypes} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Grid item>
          {loadingResults ?
            <CircularProgress />
            : <PokemonList fetchAll={onSearchHandler} pokemonList={pokemonList} />}
          {!loadingResults && hasNextPage ?
            <ShowMore showMoreClicked={onShowMoreHandler} />
            : <></>}
        </Grid>
      </Grid>
    </>
  );
};

export default Pokemons;
