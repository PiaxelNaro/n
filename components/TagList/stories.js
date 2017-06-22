import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TagList from '.';

import data from '../../data/taglist';

class Demo extends React.Component {
    constructor() {
        super();

        this.state = {
            current: 'ad_revenue',
        };
        this.onTagChange = this.onTagChange.bind(this);
    }

    onTagChange(newValue) {
        this.setState({ current: newValue });
    }

    render() {
        return (
            <TagList
                items={data}
                current={this.state.current}
                onChange={this.onTagChange}
            />
        );
    }
}

storiesOf('TagList', module).add('render taglist', () => <Demo />);
