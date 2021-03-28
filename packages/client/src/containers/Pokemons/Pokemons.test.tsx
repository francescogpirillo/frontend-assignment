import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pokemons from './Pokemons';
import Search from '../../components/Search/Search';
import PokemonList from '../../components/PokemonList/PokemonList';

configure({ adapter: new Adapter() });

describe('<App />', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(<Pokemons />);
    })

    it('should render one Search component', () => {
        expect(wrapper.find(Search)).toHaveLength(1);
    });

    it('should render one PokemonList component', () => {
        expect(wrapper.find(PokemonList)).toHaveLength(1);
    });
});
