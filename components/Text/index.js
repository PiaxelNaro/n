import styled from 'styled-components';

const Text = styled.div`
    /* override color */
    color: ${props => (props.color ? props.color : 'inherit')};

    /* text ellipsis */
    word-break: ${props => (props.ellipsis ? 'break-all' : 'inherit')};
    white-space: ${props => (props.ellipsis ? 'nowrap' : 'inherit')};
    text-overflow: ${props => (props.ellipsis ? 'ellipsis' : 'inherit')};
    overflow: ${props => (props.ellipsis ? 'hidden' : 'inherit')};

    /* text transform */
    text-transform: ${props => (props.textTransform ? props.textTransform : 'inherit')};
`;

export default Text;
