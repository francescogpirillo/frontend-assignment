import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PokemonList from './PokemonList';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

configure({ adapter: new Adapter() });

describe('<PokemonList />', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(<PokemonList fetchAll={() => { }} pokemonList={[]} />);
    })

    it('should render one TableContainer', () => {
        expect(wrapper.find(TableContainer)).toHaveLength(1);
    });

    it('should render one TableHead', () => {
        expect(wrapper.find(TableHead)).toHaveLength(1);
    });

    it('should render four TableRows', () => {
        wrapper.setProps({
            pokemonList: [
                {
                    name: 'Bulbasaur',
                    types: 'Grass,Poison',
                    classification: 'Seed Pokémon'
                },
                {
                    name: 'Ivysaur',
                    types: 'Grass,Poison',
                    classification: 'Seed Pokémon'
                },
                {
                    name: 'Venusaur',
                    types: 'Grass,Poison',
                    classification: 'Seed Pokémon'
                }
            ]
        })
        expect(wrapper.find(TableRow)).toHaveLength(4);
    });
});
