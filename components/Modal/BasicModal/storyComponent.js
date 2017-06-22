// @flow
import React from 'react';
import Button from '../../Button';
import FlexGrid from '../../FlexGrid';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '.';

class BasicModalStory extends React.Component {
    constructor() {
        super();

        this.state = { open: true };
        this.close = this.close.bind(this);
    }

    state: {
        open: boolean,
    };

    close: () => void;

    close() {
        this.setState({ open: false });
    }

    render() {
        const body = (
            <FlexGrid.Item textAlign="center"><h1>I am AAModal body</h1></FlexGrid.Item>
        );
        const primaryAction = <Button.Primary>Primary Action</Button.Primary>;
        const secondaryAction = <Button.Secondary>Secondary Action</Button.Secondary>;
        const footer = (
            <FlexGrid>
                <FlexGrid.Item>{secondaryAction}</FlexGrid.Item>
                {primaryAction}
            </FlexGrid>
        );

        return (
            <div>
                <button onClick={() => this.setState(state => ({ open: !state.open }))}>
                    Click me
                </button>

                <Modal isOpen={this.state.open} onRequestClose={this.close}>
                    <ModalHeader title={'I am an AAModal'} onRequestClose={this.close} />
                    <ModalBody>{body}</ModalBody>
                    <ModalFooter>{footer}</ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default BasicModalStory;
