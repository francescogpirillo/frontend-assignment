export interface PokemonsByNameVariables {
    pokemonsQ: string,
    pokemonsAfter: string,
    pokemonsLimit?: number
}

export interface PokemonsByTypeVariables {
    pokemonsByTypeType: string,
    pokemonsByTypeAfter: string,
    pokemonsByTypeLimit?: number
}

export interface PokemonsByFiltersVariables {
    pokemonsByFiltersType: string,
    pokemonsByFiltersQ: string,
    pokemonsByFiltersAfter: string,
    pokemonsByFiltersLimit?: number
}