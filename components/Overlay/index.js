// @flow
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Portal from 'react-portal';
import getPositionCoords from '../../modules/getPositionCoords';

type TriggerType = 'hover' | 'click';

const ARROW_OFFSET = 30;

const ArrowUp = styled.div`
    position: absolute;
    top: -2px;
    width: 20px;
    height: 10px;
    overflow: hidden;

    ::before {
        display: block;
        position: absolute;
        top: 2px;
        left: 50%;
        width: 16px;
        height: 16px;
        content: "";
        background-color: #fff;
        border: 1px solid #999;
        border-radius: 3px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        transform: rotate(45deg);
        transform-origin: 0 0;
    }

    .align-left & {
        left: ${ARROW_OFFSET}px;
        transform: translate(-50%);
    }

    .align-right & {
        right: ${ARROW_OFFSET}px;
        transform: translate(50%);
    }
`;

const OverlayWrapper = styled.div.attrs({
    className: props => classnames({ 'with-arrow': props.showArrow }),
})`
    position: absolute;
    top: 0;
    padding-top: 5px;
    min-width: 200px;
    max-width: 700px;

    &.with-arrow {
        padding-top: 7px;

    }

    .align-left &.with-arrow {
        margin-left: 50%;
        transform: translateX(-${ARROW_OFFSET}px);
    }

    .align-right &.with-arrow {
        margin-right: 50%;
        transform: translateX(${ARROW_OFFSET}px);
    }
`;

const OverlayInner = styled.div`
    box-sizing: border-box;
    border: 1px solid #999;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

    font-size: 12px;
    text-align: left;
    color: #2F4B66;
`;

const OverlayPositionner = styled.div.attrs({
    className: props => `align-${props.alignTo}`,
})`
    position: absolute;
    z-index: 1;
    height: 0;

    &.align-left ${OverlayWrapper} {
        left: 0;
    }

    &.align-right ${OverlayWrapper} {
        right: 0;
    }
`;

const Overlay = ({ children, showArrow }: { children?: any, showArrow?: boolean }) =>
    <OverlayWrapper showArrow={showArrow}>
        {showArrow ? <ArrowUp /> : ''}
        <OverlayInner>
            {children}
        </OverlayInner>
    </OverlayWrapper>;

const OverlayControl = styled.div`
    display: inline-block;
    position: relative;
`;
OverlayControl.displayName = 'OverlayControl';

const DEFAULT_POSITION = {
    style: {
        top: 0,
        left: 0,
    },
    alignTo: 'left',
};

Overlay.Trigger = class extends React.Component {
    props: {
        children: any,
        trigger: TriggerType,
        getOverlay: () => any,
    };

    state: {
        isOpen: boolean,
    };

    toggleOverlay: Function;
    closeOverlay: Function;
    openOverlay: Function;
    closeTimeout: any;
    triggerEl: HTMLElement;

    constructor() {
        super();

        this.state = {
            isOpen: false,
        };

        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.openOverlay = this.openOverlay.bind(this);
    }

    toggleOverlay() {
        if (this.state.isOpen) {
            this.closeOverlay();
        } else {
            this.openOverlay();
        }
    }

    closeOverlay() {
        // Because the overlay is not inside the trigger, the overlay close if we move the mouseout.
        // This prevents user from clicking buttons and links that might be inside the overlay
        // itself.
        //
        // To keep the overlay open, we use a timeout so the close operation can be cancelled when
        // the Overlay mouseOver event triggers. Example: a user move their mouse from the trigger
        // to the overlay, the closeOverlay function is called (trigger mouseOut handler), then the
        // openOverlay immediately triggers (overlay mouseOver handler) and cancel the delayed
        // close action.
        //
        // 10ms in this case is an arbitrary time. It is small enough to not be noticeable, and
        // give us a few ms in case of unforeseen delay in processing the overlay mouse hover
        // action.
        this.closeTimeout = setTimeout(() => {
            this.setState({ isOpen: false });
        }, 10);
    }

    openOverlay() {
        clearTimeout(this.closeTimeout);

        this.setState({
            isOpen: true,
        });
    }

    render() {
        const { trigger, getOverlay } = this.props;

        let overlay;
        if (this.state.isOpen) {
            let position = DEFAULT_POSITION;
            if (this.triggerEl) {
                position = getPositionCoords(this.triggerEl);
            }
            overlay = (
                <Portal isOpened closeOnOutsideClick onClose={this.closeOverlay}>
                    <OverlayPositionner
                        alignTo={position.alignTo}
                        style={position.style}
                        onMouseOver={trigger === 'hover' && this.openOverlay}
                        onMouseOut={trigger === 'hover' && this.closeOverlay}
                    >
                        {getOverlay()}
                    </OverlayPositionner>
                </Portal>
            );
        }

        return (
            <OverlayControl
                innerRef={ref => (this.triggerEl = ref)}
                onClick={trigger === 'click' && this.toggleOverlay}
                onMouseOver={trigger === 'hover' && this.openOverlay}
                onMouseOut={trigger === 'hover' && this.closeOverlay}
            >
                {this.props.children}
                {overlay}
            </OverlayControl>
        );
    }
};
Overlay.Trigger.displayName = 'OverlayTrigger';
export { OverlayWrapper, OverlayPositionner };
export default Overlay;
