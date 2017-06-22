// @flow
import styled, { css } from 'styled-components';

const Toggle = styled.span`
    display: inline-block;
    position: relative;
    width: 26px;
    height: 12px;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => (props.checked ? '#3f88d4' : '#efefef')};
    border-radius: 6px;
    ${props => (props.disabled ? css`pointer-events: none;` : '')}
    ::before {
        position: absolute;
        top: -1px;
        left: 0;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: ${props => (props.disabled ? '#ccc' : '#fff')};
        content: "";
        box-shadow: rgba(0,0,0,0.3) 0 1px 3px 0.2px;
        transition: .4s;
        ${props => (props.checked ? css`transform: translateX(12px);` : '')}
    }
`;
Toggle.displayName = 'Toggle';

export default Toggle;
