// @flow
import React from 'react';
import styled from 'styled-components';
import DownloadIcon from 'react-icons/lib/fa/download';
import Button from '../../Button';
import ButtonGroup from '../ButtonGroup';
import FlexGrid from '../../FlexGrid';

const IconLabelWrapper = styled(FlexGrid.Item)`
    color: #999;
    font-size: 12px;
`;

const StyledButton = styled(Button)`
    padding: 5px 6px;
    font-size: 11px;
    color: #999;
    text-decoration: none;
    &:hover,
    &:focus {
        background-image: linear-gradient(to bottom, #fff, #e2e2e2);
    }
`;

const ExportButtons = ({
    csvLink,
    xlsxLink,
}: {
    csvLink: string,
    xlsxLink: string,
}) => (
    <FlexGrid inline gutter="5px">
        <IconLabelWrapper flex={0}>
            <DownloadIcon size={12} />
        </IconLabelWrapper>
        <IconLabelWrapper flex={0}>
            Export
        </IconLabelWrapper>
        <ButtonGroup>
            <StyledButton
                target="_blank"
                rel="noreferrer noopener"
                href={csvLink}
            >
                CSV
            </StyledButton>
            <StyledButton
                target="_blank"
                rel="noreferrer noopener"
                href={xlsxLink}
            >
                XLSX
            </StyledButton>
        </ButtonGroup>
    </FlexGrid>
);

export default ExportButtons;
