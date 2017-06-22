// @flow
import styled, { css } from 'styled-components';

const FlexGrid = styled.div`
    display: ${props => (props.inline ? 'inline-flex' : 'flex')};
    align-items: center;
    ${props => (props.gutter ? css`
        & > :nth-child(n + 2) {
            margin-left: ${props.gutter};
        }
    ` : '')}
`;
FlexGrid.displayName = 'FlexGrid';

FlexGrid.Item = styled.div`
    min-width: ${props => (props.flex > 0 ? 0 : 'auto')};
    flex-shrink: ${props => (props.flex > 0 ? 1 : 0)};
    flex: ${props => props.flex};
    flex-basis: auto;
`;
FlexGrid.Item.defaultProps = { flex: 1 };
FlexGrid.Item.displayName = 'FlexGrid.Item';

const ColumnGrid = styled.div`
    & > :nth-child(n + 2) {
        margin-top: ${props => props.gutter};
    }
`;
export default FlexGrid;
export { ColumnGrid };
