// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ClearIcon from 'react-icons/lib/md/clear';

import Button, { StyledButton, StyledLink } from '.';

describe('<Button>', () => {
    it('renders text', () => {
        expect(shallow(<Button>My Button</Button>)).toMatchSnapshot();
        expect(shallow(<Button active>My Button</Button>)).toMatchSnapshot();
        expect(shallow(<Button disabled>My Button</Button>)).toMatchSnapshot();
        expect(shallow(<Button href="testLink">My Button</Button>)).toMatchSnapshot();
    });
});

describe('<StyledButton>', () => {
    expect(
        shallow(<StyledButton active>My Button</StyledButton>)
    ).toMatchSnapshot();
    expect(
        shallow(<StyledButton disabled>My Button</StyledButton>)
    ).toMatchSnapshot();
});

describe('<StyledLink>', () => {
    expect(
        shallow(<StyledLink active href="testLink">My Button</StyledLink>)
    ).toMatchSnapshot();
    expect(
        shallow(<StyledLink disabled href="testLink">My Button</StyledLink>)
    ).toMatchSnapshot();
});

describe('<Button.Blank>', () => {
    const clickSpy = jest.fn();
    const button = shallow(<Button.Blank onClick={clickSpy}><ClearIcon /></Button.Blank>);

    it('renders button with icon', () => {
        expect(button).toMatchSnapshot();
    });

    it('click blank button', () => {
        button.simulate('click');
        expect(clickSpy).toHaveBeenCalled();
    });
});
