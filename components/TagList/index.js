// @flow
import React from 'react';
import styled from 'styled-components';
import FlexGrid from '../FlexGrid';

const TagList = ({
    items,
    current,
    onChange,
}: {
    items: Array<Object>,
    current: string,
    onChange: string => void,
}) => (
    <FlexGrid>
        {items.map(tag => {
            const isActive = current === tag.id;
            if (isActive) {
                return (
                    <TagItem key={tag.id} isActive>
                        {tag.name}
                    </TagItem>
                );
            }
            return (
                <TagItem key={tag.id} onClick={() => onChange(tag.id)}>
                    {tag.name}
                </TagItem>
            );
        })}
    </FlexGrid>
);

const StyledTag = styled.div`
    padding: 5px;
    cursor: pointer;
    font-size: 11px;
    color: ${props => (props.isActive ? '#fff' : '#507BA5')};
    background-color: ${props => (props.isActive ? '#2f4b66' : 'transparent')};
    border-radius: 2px;
`;

const TagItem = ({
    isActive,
    onClick,
    children,
}: {
    isActive?: boolean,
    onClick?: string => void,
    children?: any,
}) => {
    if (isActive) {
        return <StyledTag isActive>{children}</StyledTag>;
    }
    return <StyledTag onClick={onClick}>{children}</StyledTag>;
};
TagItem.defaultProps = {
    children: null,
};

export default TagList;
export { TagItem, StyledTag };
