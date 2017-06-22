// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateAction } from '@kadira/storybook-addon-actions';
import Pagination from '.';

const storiesAction = decorateAction([args => args.slice(0, 1)]);
class PaginationDemo extends React.Component {
    handlePageChange: Function;

    constructor() {
        super();
        this.state = {
            current: 2,
            total: 20,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page) {
        this.setState({
            current: page,
        });
    }

    render() {
        return (
            <Pagination
                total={this.state.total}
                current={this.state.current}
                onPageChange={this.handlePageChange}
            />
        );
    }
}

storiesOf('Pagination', module)
    .add('render pagination', () => (
        <Pagination total={10} current={2} onPageChange={storiesAction('onPageChange')} />
    ))
    .add('render dynamic pagination', () => <PaginationDemo />);
