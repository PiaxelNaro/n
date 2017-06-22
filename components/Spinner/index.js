// @flow
import styled, { keyframes } from 'styled-components';
import SpinnerIcon from 'react-icons/lib/fa/spinner';

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled(SpinnerIcon)`
    display: inline-block;
    animation: ${rotate360} 2s linear infinite;
`;
Spinner.displayName = 'Spinner';

export default Spinner;
