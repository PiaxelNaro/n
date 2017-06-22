// @flow
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import normalize from 'styled-normalize';
import FlexGrid from '../../components/FlexGrid';
import BackToTopButton from '../../components/BackToTopButton';
import Footer from '../../components/Footer';

import Sidebar from '../Sidebar';

import footer from '../../data/footer';

injectGlobal`
    ${normalize}

    body {
        font-family: Helvetica, Arial, sans-serif;
        color: #2f4b66;
        font-size: 13px;
    }
`;

const Main = styled.div`
    border-top: 1px solid #D9DCDF;
    border-bottom: 1px solid #D9DCDF;
    padding: 20px 40px 20px 15px;
`;

export default ({
    collapseSidebar,
    children,
}: {
    collapseSidebar?: boolean,
    children?: any,
}) => (
    <FlexGrid>
        <FlexGrid.Item flex={0}>
            <Sidebar isCollapsable={collapseSidebar} />
        </FlexGrid.Item>
        <FlexGrid.Item>
            <FlexGrid>
                <FlexGrid.Item flex={0}>
                    Top bar content
                </FlexGrid.Item>
            </FlexGrid>
            <Main>
                {children}
            </Main>
            <Footer content={footer} />
        </FlexGrid.Item>
        <BackToTopButton />
    </FlexGrid>
);
