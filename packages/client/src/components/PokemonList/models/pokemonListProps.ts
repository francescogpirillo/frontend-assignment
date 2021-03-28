import { Pokemon } from '../../../shared/models/Pokemon';

export interface PokemonListProps {
    pokemonList: Pokemon[];
    fetchAll: () => void;
}