import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Pokemons from './containers/Pokemons/Pokemons'

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('should render one Pokemons component', () => {
    expect(wrapper.find(Pokemons)).toHaveLength(1);
  });

  it('should render one img', () => {
    expect(wrapper.find('img')).toHaveLength(1);
  });
});