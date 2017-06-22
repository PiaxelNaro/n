// @flow
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ClearIcon from 'react-icons/lib/md/clear';
import GlobeIcon from 'react-icons/lib/fa/globe';
import Table from '../Table';
import FlexGrid from '../FlexGrid';
import DropdownButton from './Dropdown';
import Button from '.';

storiesOf('Button', module)
    .add('button types', () =>
        <Table
            fixedColumns={0}
            columns={[
                {
                    label: 'Chrome button',
                    key: 'chrome',
                },
                {
                    label: 'Action Button',
                    key: 'action',
                },
                {
                    label: 'Dropdown Button',
                    key: 'dropdown',
                },
            ]}
            items={[
                {
                    id: 'example',
                    chrome: (
                        <div>
                            <FlexGrid gutter="4px">
                                <Button>Default</Button>
                                <Button active>Active</Button>
                                <Button disabled>Disabled</Button>
                            </FlexGrid>
                            <FlexGrid gutter="4px">
                                <Button href="#">Default</Button>
                                <Button href="#" active>Active</Button>
                                <Button href="#" disabled>Disabled</Button>
                            </FlexGrid>
                        </div>
                    ),
                    action: (
                        <FlexGrid gutter="4px">
                            <Button.Primary>Primary</Button.Primary>
                            <Button.Secondary>Secondary</Button.Secondary>
                            <Button.Primary disabled>Disabled</Button.Primary>
                            <Button.Secondary disabled>Disabled</Button.Secondary>
                        </FlexGrid>
                    ),
                    dropdown: (
                        <FlexGrid gutter="4px">
                            <DropdownButton
                                label="Country"
                                labelIcon={<GlobeIcon size={11} />}
                                value="China"
                            />
                        </FlexGrid>
                    ),
                },
            ]}
        />
    )
    .add('blank button with icon', () =>
        <div>
            <Button.Blank onClick={action('Clicked icon button')}>
                <ClearIcon size={16} />
            </Button.Blank>
        </div>
    );
