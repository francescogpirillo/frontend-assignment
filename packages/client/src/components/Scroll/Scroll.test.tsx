import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Scroll from './Scroll';

configure({ adapter: new Adapter() });

describe('<Scroll />', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(<Scroll showBelow={250} />);
    })

    it('should find .scroll class', () => {
        expect(wrapper.find('.scroll')).toHaveLength(1);
    });

    it('should find a div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
});
