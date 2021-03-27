import { IResolvers } from "graphql-tools";
import * as pokemons from "./models/pokemons";

export const resolvers: IResolvers = {
  Query: {
    pokemons: (_source, args) => pokemons.query(args),
    pokemonsByType: (_source, args) => pokemons.queryPokemonsByType(args),
    pokemonsByFilters: (_source, args) => pokemons.queryPokemonsByFilters(args),
    pokemonTypes: (_source) => pokemons.pokemonTypes()
  }
};