// @flow
import React from 'react';
import styled from 'styled-components';
import FlexGrid from '../FlexGrid';

const RawInput = styled.input`
    width: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    height: 22px;
`;

const FakeInput = styled.div`
    display: block;
    border: 1px solid #999;
    border-radius: 16px;
    box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    padding: 2px 10px;
`;

const Input = ({
    value,
    onChange,
    onClick,
    placeholder,
    icon,
    width,
}: {
    value: any,
    onChange: string => any,
    onClick?: SyntheticEvent => any,
    placeholder?: string,
    icon: any,
    width: string,
}) => (
    <FakeInput style={{ width }}>
        <FlexGrid>
            <FlexGrid.Item>
                <RawInput
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onClick={onClick}
                    placeholder={placeholder}
                />
            </FlexGrid.Item>
            {icon}
        </FlexGrid>
    </FakeInput>
);

Input.defaultProps = {
    onClick: null,
    placeholder: '',
};

export default Input;
