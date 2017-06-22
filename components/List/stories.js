// @flow
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import FolderIcon from 'react-icons/lib/fa/folder-open-o';
import GlobeIcon from 'react-icons/lib/fa/globe';
import List from '.';
import FlexGrid from '../FlexGrid';
import data from '../../data/list';

const ListItemWidth = 180;

class Demo extends React.Component {
    constructor() {
        super();
        this.state = {
            current: data.current,
            list: data.list,
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect: Function;

    onSelect(id) {
        this.setState({
            current: id,
        });
    }

    render() {
        return (
            <List
                list={this.state.list}
                current={this.state.current}
                onSelect={this.onSelect}
                itemWidth={ListItemWidth}
            />
        );
    }
}

storiesOf('List', module)
    .add('render list', () => (
        <FlexGrid gutter="8px">
            <List
                label="Country"
                labelIcon={<GlobeIcon size={11} />}
                list={data.list}
                current={data.current}
                onSelect={action('onSelect')}
                itemWidth={ListItemWidth}
            />
            <List
                label="Category"
                labelIcon={<FolderIcon size={11} />}
                list={data.list}
                current={data.current}
                onSelect={action('onSelect')}
                itemWidth={ListItemWidth}
            />
        </FlexGrid>
    ))
    .add('render dynamic list', () => <Demo />);
