// @flow

import React from 'react';
import styled from 'styled-components';
import FaSort from 'react-icons/lib/fa/sort';
import FaSortAsc from 'react-icons/lib/fa/sort-asc';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';

const SIZE = 13;
const SORT_ICONS = {
    asc: <FaSortAsc size={SIZE} color="currentColor" />,
    desc: <FaSortDesc size={SIZE} color="currentColor" />,
};
const DEFAULT = <FaSort size={SIZE} color="#CCC" />;

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: ${SIZE}px;
    height: ${SIZE}px;

    > svg {
        position: absolute;
    }
`;

const SortIndicator = ({ direction }: { direction?: 'asc' | 'desc' | null }) => (
    <Wrapper>
        {DEFAULT}
        {direction ? SORT_ICONS[direction] : null}
    </Wrapper>
);

export default SortIndicator;
