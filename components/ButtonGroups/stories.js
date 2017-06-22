import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from '../Button';
import ButtonGroup from './ButtonGroup';
import ExportButtons from './ExportButtons';

const exportLinks = {
    csv: 'https://www..com/report/export/ss-review/csv/?market=ios&product=minecraft-pocket-edition&end_date=2017-04-17&begin_date=2017-03-18',
    xlsx: 'https://www..com/report/export/ss-review/xlsx/?market=ios&product=minecraft-pocket-edition&end_date=2017-04-17&begin_date=2017-03-18',
};

storiesOf('ButtonGroups', module)
    .add('render Basic ButtonGroup', () => (
        <div>
            <ButtonGroup>
                <Button>Hello,</Button>
                <Button>I</Button>
                <Button>am</Button>
                <Button>a</Button>
                <Button>ButtonGroup</Button>
            </ButtonGroup>
        </div>
    ))
    .add('render ExportButtons', () => (
        <ExportButtons csvLink={exportLinks.csv} xlsxLink={exportLinks.xlsx} />
    ));
