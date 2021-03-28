import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShowMore from './ShowMore';
import { Button } from '@material-ui/core';

configure({ adapter: new Adapter() });

describe('<ShowMore />', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(<ShowMore showMoreClicked={() => { }} />);
    })

    it('should render one Button', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
