// @flow
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const StyledButton = styled.button.attrs({
    className: props =>
        classnames({
            'is-active': props.active,
            'is-disabled': props.disabled,
        }),
    disabled: props => props.disabled,
})`
    cursor: pointer;
    background: #efefef;
    background-image: linear-gradient(to top, #efefef, #fff);
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 8px 7px;
    outline: none;
    text-decoration: none;
    color: #000;
    font-size: 11px;
    font-family: Helvetica, Arial, sans-serif;

    &.is-active {
        background-image: linear-gradient(to bottom, #efefef, #fff);
    }

    &.is-disabled {
        color: #a5a5a5;
        cursor: not-allowed;
    }
`;

const StyledLink = StyledButton.withComponent('a');

const Button = (props: { href?: string }) => {
    if (props.href) {
        return <StyledLink {...props} />;
    }
    return <StyledButton {...props} />;
};

Button.Blank = styled.button`
    border: none;
    background: none;
    font-size: 13px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    outline: none;
    color: inherit;
`;

Button.Action = styled.button`
    border: 1px solid #3F88D4;
    border-radius: 15px;
    font-size: 13px;
    min-width: 60px;
    height: 27px;
    padding: 0 20px;
    cursor: pointer;
    outline: none;
    background: none;
`;

Button.Primary = styled(Button.Action)`
    background-color: #3F88D4;
    color: #FFF;
    cursor: pointer;
    line-height: 1;

    :hover,
    :focus {
        background-color: #65A0DD;
    }

    &[disabled] {
        background-color: #3F88D4;
        opacity: 0.5;
        cursor: default;
    }
`;
Button.Primary.displayName = 'ButtonPrimary';

Button.Secondary = styled(Button.Action)`
    color: #3F88D4;
    background-color: #FFF;
    cursor: pointer;
    line-height: 1;

    :hover,
    :focus {
        color: #FFF;
        background-color: #3F88D4;
    }

    &[disabled] {
        color: #3F88D4;
        background-color: #FFF;
        opacity: 0.5;
        cursor: default;
    }
`;
Button.Secondary.displayName = 'ButtonSecondary';

export default Button;
export { StyledButton, StyledLink };
