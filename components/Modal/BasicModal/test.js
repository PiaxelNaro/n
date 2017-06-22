// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Modal, { ModalHeader } from '.';

describe('<Modal/>', () => {
    it('wraps react-modal with custom style', () => {
        expect(
            shallow(
                <Modal
                    contentLabel="test"
                    isOpen
                    onAfterOpen={() => null}
                    onRequestClose={() => null}
                >
                    Hey
                </Modal>
            )
        ).toMatchSnapshot();
    });

    it('does not break when not specifying onAfterOpen', () => {
        const modal = shallow(
            <Modal contentLabel="test" isOpen onRequestClose={() => null}>
                Hey
            </Modal>
        );

        modal.find('Modal').prop('onAfterOpen')();
    });

    it('renders ModalHeader', () => {
        const fn = jest.fn();
        const modal = shallow(<ModalHeader title="My Modal" onRequestClose={fn} />);
        expect(modal).toMatchSnapshot();

        modal.find('BasicModal__StyledCloseButton').simulate('click');
        expect(fn).toHaveBeenCalledTimes(1);
    });
});
