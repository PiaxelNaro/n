import React from 'react';
import { storiesOf } from '@kadira/storybook';
import styled from 'styled-components';
import Logo from '.';


const Wrapper = styled.div`
    background: #102235;
    width: 200px;
`;

storiesOf('Logo', module)
    .add('default', () => (
        <Wrapper>
            <Logo />
        </Wrapper>
    ))
    .add('mini', () => (
        <Wrapper>
            <Logo mini />
        </Wrapper>
    ))
    .add('mini & premium', () => (
        <Wrapper>
            <Logo mini premium />
        </Wrapper>
    ));
