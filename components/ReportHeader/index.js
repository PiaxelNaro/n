// @flow
import React from 'react';
import styled from 'styled-components';

const MainTitle = styled.h1`
    font-size: 26px;
    color: #666;
    font-weight: normal;
    padding: 0;
    margin: 5px 0;
`;

const SubTitle = styled.h3`
    color: #888;
    font-size: 15px;
    font-weight: normal;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
`;

const TitleLink = styled.a`
    color: #5fafd7;
    margin-left: 5px;
    text-decoration: none;
    outline-style: none;
    cursor: pointer;
    font-size: 13px;

    &:hover, &:active {
        text-decoration: underline;
    }
`;

const ReportHeader = ({
    title,
    subtitle,
    link,
}: {
    title: string,
    subtitle?: string,
    link: Object,
}) => (
    <div>
        <SubTitle>{subtitle}</SubTitle>
        <MainTitle>
            {title}
            <TitleLink target="_blank" rel="noopener noreferrer" href={link.url}>
                {link.text}
            </TitleLink>
        </MainTitle>
    </div>
);

export default ReportHeader;
