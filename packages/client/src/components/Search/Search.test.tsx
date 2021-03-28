import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './Search';
import { Button, TextField } from '@material-ui/core';

configure({ adapter: new Adapter() });

describe('<Search />', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(<Search pokemonTypes={[]} onSearch={() => { }} />);
    })

    it('should render one Button', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('should render two TextField', () => {
        expect(wrapper.find(TextField)).toHaveLength(2);
    });
});
