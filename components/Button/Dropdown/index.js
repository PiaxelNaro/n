// @flow
import React from 'react';
import styled from 'styled-components';
import DropdownIcon from 'react-icons/lib/md/arrow-drop-down';
import Text from '../../Text';
import FlexGrid from '../../FlexGrid';
import Button from '..';

const StyledDropdownButton = styled(Button)`
    text-align: left;
    width: 100%;
`;

const DropdownLabel = styled(FlexGrid)`
    color: #999;
    font-size: 11px;
    align-items: flex-start;
`;

const DropdownButton = ({
    label,
    labelIcon,
    value,
    width = '110px',
}: {
    label?: string,
    labelIcon?: any,
    value: string,
    width?: string,
}) => {
    let buttonLabel;
    if (label) {
        buttonLabel = (
            <DropdownLabel gutter="3px">
                {labelIcon}
                <Text ellipsis>{label}</Text>
            </DropdownLabel>
        );
    }

    return (
        <div style={{ width }}>
            {buttonLabel}
            <StyledDropdownButton>
                <FlexGrid>
                    <FlexGrid.Item>
                        <Text ellipsis>{value}</Text>
                    </FlexGrid.Item>
                    <DropdownIcon size={13} />
                </FlexGrid>
            </StyledDropdownButton>
        </div>
    );
};

export default DropdownButton;
