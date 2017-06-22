// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const Wrapper = styled.span`
    display: inline-flex;
    & > :nth-child(n) {
        border-radius: 0;
        border-right: 0;
    }
    & > :first-child {
        border-radius: 2px 0 0 2px;
    }
    & > :last-child {
        border-radius: 0 2px 2px 0;
        border-right: 1px solid #ccc;
    }
`;

const ButtonGroup = ({
    children,
}: {
    children?: Button,
}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default ButtonGroup;
