import { DocumentNode, gql } from "@apollo/client";

export const GET_POKEMONS_BY_NAME: DocumentNode = gql`
    query Query(
    $pokemonsQ: String
    $pokemonsAfter: ID
    $pokemonsLimit: Int
    ) {
    pokemons(
        q: $pokemonsQ
        after: $pokemonsAfter
        limit: $pokemonsLimit
    ) {
        edges {
        cursor
        node {
            id
            name
            classification
            types
        }
        }
        pageInfo {
        endCursor
        hasNextPage
        }
    }
}`;

export const GET_POKEMONS_BY_TYPE: DocumentNode = gql`
    query Query(
    $pokemonsByTypeType: String!
    $pokemonsByTypeAfter: ID
    $pokemonsByTypeLimit: Int
    ) {
    pokemonsByType(
        type: $pokemonsByTypeType
        after: $pokemonsByTypeAfter
        limit: $pokemonsByTypeLimit
    ) {
        edges {
        cursor
        node {
            id
            name
            classification
            types
        }
        }
        pageInfo {
        endCursor
        hasNextPage
        }
    }
}`

export const GET_POKEMONS_BY_FILTERS: DocumentNode = gql`
    query Query(
    $pokemonsByFiltersType: String!
    $pokemonsByFiltersQ: String
    $pokemonsByFiltersAfter: ID
    $pokemonsByFiltersLimit: Int
    ) {
    pokemonsByFilters(
        type: $pokemonsByFiltersType
        q: $pokemonsByFiltersQ
        after: $pokemonsByFiltersAfter
        limit: $pokemonsByFiltersLimit
    ) {
        edges {
        cursor
        node {
            id
            name
            classification
            types
        }
        }
        pageInfo {
        endCursor
        hasNextPage
        }
    }
}`

export const GET_POKEMON_TYPES: DocumentNode = gql`
    query Query {
    pokemonTypes
}`