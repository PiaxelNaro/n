// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SearchIcon from 'react-icons/lib/md/search';
import FlexGrid from '.';

// eslint-disable-next-line no-bitwise, prefer-template
const randomColor = () => '#' + (((1 << 24) * Math.random()) | 0).toString(16);
const boxStyle = () => ({
    backgroundColor: randomColor(),
    height: '60px',
});

storiesOf('FlexGrid', module)
    .add('Layout examples', () => (
        <div>
            <FlexGrid>
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
            </FlexGrid>
            <FlexGrid style={{ marginTop: '20px' }}>
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item flex={2} style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
            </FlexGrid>
            <FlexGrid style={{ marginTop: '20px' }}>
                <FlexGrid.Item flex={3} style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
            </FlexGrid>
        </div>
    ))
    .add('Grid with Gutter', () => (
        <div>
            <FlexGrid gutter="8px">
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
            </FlexGrid>
            <FlexGrid gutter="20px" style={{ marginTop: '20px' }}>
                <FlexGrid.Item style={boxStyle()} />
                <FlexGrid.Item flex={2} style={boxStyle()} />
                <FlexGrid.Item style={boxStyle()} />
            </FlexGrid>
        </div>
    ))
    .add('Inline alignment', () => (
        <FlexGrid inline>
            <FlexGrid.Item>Loading</FlexGrid.Item>
            <FlexGrid.Item flex={0}>
                <SearchIcon size={40} />
            </FlexGrid.Item>
        </FlexGrid>
    ));
