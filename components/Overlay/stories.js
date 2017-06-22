// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Overlay from '.';
import Tooltip from './Tooltip';
import Button from '../Button';
import FlexGrid from '../FlexGrid';

const tooltipContent = (
    <div>
        <p>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                Facebook
            </a>
        </p>
        <p>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                Youtube
            </a>
        </p>
    </div>
);

storiesOf('Overlay', module)
    .add('Static Overlay', () =>
        <Overlay>
            Hello
        </Overlay>
    )
    .add('Overlay trigger', () =>
        <FlexGrid>
            <FlexGrid.Item flex={1}>
                <Overlay.Trigger
                    trigger="click"
                    getOverlay={() =>
                        <Overlay>
                            Hello
                        </Overlay>}
                >
                    <Button>Open left</Button>
                </Overlay.Trigger>
                <Overlay.Trigger
                    trigger="click"
                    getOverlay={() =>
                        <Overlay showArrow>
                            Hello
                        </Overlay>}
                >
                    <Button>Open tooltip</Button>
                </Overlay.Trigger>
            </FlexGrid.Item>
            <FlexGrid.Item flex={0}>
                <Overlay.Trigger
                    trigger="click"
                    getOverlay={() =>
                        <Overlay showArrow>
                            Hello
                        </Overlay>}
                >
                    <Button>Open tooltip</Button>
                </Overlay.Trigger>
                <Overlay.Trigger
                    trigger="click"
                    getOverlay={() =>
                        <Overlay>
                            Hello
                        </Overlay>}
                >
                    <Button>Open right</Button>
                </Overlay.Trigger>
            </FlexGrid.Item>
        </FlexGrid>
    )
    .add('Tooltip', () => <Tooltip content={tooltipContent}>Ad Platforms</Tooltip>);
