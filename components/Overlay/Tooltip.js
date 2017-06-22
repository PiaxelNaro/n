// @flow

import React from 'react';
import styled from 'styled-components';
import Overlay from '.';

const ContentWrapper = styled.span`
    border-bottom: 1px dotted #aaa;
    cursor: help;
`;

const TooltipWrapper = styled.div`
    color: #999;
    padding: 8px 6px;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.5;
`;

const Tooltip = ({
    content,
    children,
    showArrow = true,
}: {
    content: any,
    children: any,
    showArrow?: boolean,
}) =>
    <Overlay.Trigger
        trigger="hover"
        getOverlay={() =>
            <Overlay showArrow={showArrow}>
                <TooltipWrapper>{content}</TooltipWrapper>
            </Overlay>}
    >
        <ContentWrapper>{children}</ContentWrapper>
    </Overlay.Trigger>;

export default Tooltip;
