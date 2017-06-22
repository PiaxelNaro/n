// @flow
import React from 'react';
import styled from 'styled-components';

const COLORS = {
    positive: '#008c23',
    negative: '#990000',
    neutral: '#ccc',
};

export const Wrapper = styled.span`
    color: ${props => COLORS[props.type]};
    font-family: Helvetica, Arial, sans-serif;
`;

const Unit = styled.span`
    font-size: 10px;
`;

const ValueDiff = ({
    value,
    type,
    unit = '',
}: {
    value: number,
    type?: 'value' | 'growth',
    unit?: string,
}) => {
    if (value === 0) {
        return <Wrapper type="neutral">=</Wrapper>;
    }

    let glyph;
    if (type === 'growth') {
        glyph = value > 0 ? '+' : '-';
    } else if (type === 'value') {
        glyph = value > 0 ? '▲' : '▼';
    }

    return (
        <Wrapper type={value > 0 ? 'positive' : 'negative'}>
            <Unit>{glyph}</Unit>
            {Math.abs(value)}
            <Unit>{unit}</Unit>
        </Wrapper>
    );
};

export default ValueDiff;
