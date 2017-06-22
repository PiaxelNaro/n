import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Toggle from '.';

class Demo extends React.Component {
    constructor() {
        super();

        this.state = {
            checked: false,
        };
        this.toggleHandler = this.toggleHandler.bind(this);
    }

    toggleHandler() {
        this.setState(prevState => ({
            checked: !prevState.checked,
        }));
    }

    render() {
        return (
            <div>
                <p>On (static): <Toggle checked /></p>
                <p>Off (static): <Toggle checked={false} /></p>
                <p>Disabled: <Toggle disabled /></p>
                <p>
                    Toggle:
                    <Toggle onClick={this.toggleHandler} checked={this.state.checked} />
                </p>
            </div>
        );
    }
}

storiesOf('Toggle', module).add('render toggle', () => <Demo />);
