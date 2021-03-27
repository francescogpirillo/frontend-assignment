export interface PokemonsByNameResponse {
    pokemons: PokemonsConnection
}

export interface PokemonsByTypeResponse {
    pokemonsByType: PokemonsConnection
}

export interface PokemonsByFilters {
    pokemonsByFilters: PokemonsConnection
}

export interface PageInfo {
    endCursor: string
    hasNextPage: boolean
}

export interface Pokemon {
    id: string
    name: string
    classification: string
    types: [String]
}

export interface PokemonEdge {
    cursor: string
    node: Pokemon
}

export interface PokemonsConnection {
    edges: [PokemonEdge]
    pageInfo: PageInfo
}
