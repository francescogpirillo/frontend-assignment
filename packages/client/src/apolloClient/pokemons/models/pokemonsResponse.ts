export interface PokemonsByNameResponse {
    pokemons: PokemonsConnection;
}

export interface PokemonsByTypeResponse {
    pokemonsByType: PokemonsConnection;
}

export interface PokemonsByFiltersResponse {
    pokemonsByFilters: PokemonsConnection;
}
export interface PokemonTypesResponse {
    pokemonTypes: string[];
}
export interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
}

export interface Pokemon {
    id: string;
    name: string;
    classification: string;
    types: string[];
}

export interface PokemonEdge {
    cursor: string;
    node: Pokemon;
}

export interface PokemonsConnection {
    edges: PokemonEdge[];
    pageInfo: PageInfo;
}
export interface PokemonsConnection {
    edges: PokemonEdge[];
    pageInfo: PageInfo;
}

