import { ApolloQueryResult } from "@apollo/client";
import client from "../apolloClient";
import { PokemonsByNameVariables, PokemonsByTypeVariables, PokemonsByFiltersVariables } from './models/pokemonsVariables';
import { PokemonsByNameResponse, PokemonsByTypeResponse, PokemonsByFiltersResponse, PokemonTypesResponse } from './models/pokemonsResponse';
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE, GET_POKEMONS_BY_FILTERS, GET_POKEMON_TYPES } from './queries';

const pokemons = {
  pokemonsByName(name: string, after: string = '', limit?: number): Promise<ApolloQueryResult<PokemonsByNameResponse>> {
    let variables: PokemonsByNameVariables = {
      pokemonsQ: name,
      pokemonsAfter: after,
    };
    if (limit) variables = { ...variables, pokemonsLimit: limit };
    return client.query({
      query: GET_POKEMONS_BY_NAME,
      variables: variables,
    });
  },
  pokemonsByType(type: string, after: string = '', limit?: number): Promise<ApolloQueryResult<PokemonsByTypeResponse>> {
    let variables: PokemonsByTypeVariables = {
      pokemonsByTypeType: type,
      pokemonsByTypeAfter: after,
    };
    if (limit) variables = { ...variables, pokemonsByTypeLimit: limit };
    return client.query({
      query: GET_POKEMONS_BY_TYPE,
      variables: variables,
    });
  },
  pokemonsByFilters(type: string, name: string, after: string = '', limit?: number): Promise<ApolloQueryResult<PokemonsByFiltersResponse>> {
    let variables: PokemonsByFiltersVariables = {
      pokemonsByFiltersType: type,
      pokemonsByFiltersQ: name,
      pokemonsByFiltersAfter: after,
    };
    if (limit) variables = { ...variables, pokemonsByFiltersLimit: limit };
    return client.query({
      query: GET_POKEMONS_BY_FILTERS,
      variables: variables,
    });
  },
  pokemonTypes(): Promise<ApolloQueryResult<PokemonTypesResponse>> {
    return client.query({
      query: GET_POKEMON_TYPES
    })
  }
};
export default pokemons;
