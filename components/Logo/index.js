// @flow
import styled, { css } from 'styled-components';

const Logo = styled.div`
    width: ${props => (props.mini ? '50px' : '100px')};
    height: ${props => (props.mini ? '50px' : '100px')};
    background-image: url(/static/logo.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: ${props => (props.mini ? '30px' : '60px')};
`;

export default Logo;
