// @flow
import React from 'react';
import Head from 'next/head';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import Button from '../../Button';
import FlexGrid from '../../FlexGrid';
import animationStyle from './style.scss';

const speed = 200;

const style = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        padding: '40px',
        overflowY: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
        position: 'static',
        width: 500,
        padding: 0,
        margin: '0 auto',
        boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    },
};

const Modal = ({
    isOpen,
    contentLabel,
    onAfterOpen,
    onRequestClose,
    children,
}: {
    isOpen: boolean,
    contentLabel?: string,
    onAfterOpen?: () => any,
    onRequestClose: () => any,
    children?: any,
}) => (
    <ReactModal
        isOpen={isOpen}
        contentLabel={contentLabel}
        onRequestClose={onRequestClose}
        onAfterOpen={onAfterOpen}
        style={style}
        closeTimeoutMS={speed}
        openTimeoutMS={speed}
    >
        {children}
        <Head>
            <style data-source="aa-react-basic-modal-css" type="text/css">
                {animationStyle}
            </style>
        </Head>
    </ReactModal>
);

Modal.defaultProps = {
    onAfterOpen: () => null,
    children: null,
    contentLabel: '',
};

const StyledModalHeader = styled.div`
    background: whiteSmoke;
    padding: 5px 15px;
    h3 {
        margin: 0;
        line-height: 30px;
        font-size: 14px;
    }

    border-bottom: 1px solid #ddd;
`;

const StyledCloseButton = styled(Button.Blank)`
    color: #CCC;
    :hover, :focus {
        color: #999;
    }
`;

const ModalHeader = ({
    title,
    onRequestClose,
}: {
    title: string,
    onRequestClose: () => any,
}) => (
    <StyledModalHeader>
        <FlexGrid>
            <FlexGrid.Item><h3>{title}</h3></FlexGrid.Item>
            <StyledCloseButton onClick={onRequestClose}>
                <FaClose size="16" />
            </StyledCloseButton>
        </FlexGrid>
    </StyledModalHeader>
);

const ModalBody = styled.div`
    min-height: 150px;
`;

const ModalFooter = styled.div`
    border-top: 1px solid #D9DCDF;
    padding: 15px;
    font-size: 13px;
`;

export default Modal;
export { ModalHeader, ModalBody, ModalFooter };
