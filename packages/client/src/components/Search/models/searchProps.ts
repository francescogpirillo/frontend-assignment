export interface SearchProps {
    pokemonTypes: string[];
    onSearch: (
        name: string,
        type: string,
        after?: string,
        showMore?: boolean
    ) => void;
}