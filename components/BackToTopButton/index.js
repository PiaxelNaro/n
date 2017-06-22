// @flow
import React from 'react';
import styled from 'styled-components';
import ChevronUpIcon from 'react-icons/lib/fa/chevron-up';
import { scrollAggregator } from '../../modules/eventAggregator';

const Wrapper = styled.div`
    width: 32px;
    height: 32px;
    line-height: 26px;
    position: fixed;
    bottom: 48px;
    right: 30px;
    cursor: pointer;
    border-radius: 2px;
    text-align: center;
    box-shadow: 0 0 2px #61b9e8;
    background: rgba(10, 10, 10, 0.3);
    color: rgba(255, 255, 255, 0.8);
    &:hover,
    &:focus {
        background: rgba(10, 10, 10, 0.5);
        color: #fff;
    }
`;

const backToTop = () => {
    global.document.body.scrollTop = 0; // For Chrome, Safari and Opera
    global.document.documentElement.scrollTop = 0; // For IE and Firefox
};

class BackToTopButton extends React.Component {
    state: {
        display: boolean,
    };

    scrollWatcher: Function;
    removeScrollWatcher: Function;

    constructor() {
        super();

        this.state = {
            display: false,
        };

        this.scrollWatcher = this.scrollWatcher.bind(this);
    }

    componentDidMount() {
        this.removeScrollWatcher = scrollAggregator(this.scrollWatcher);
    }

    componentWillUnmount() {
        this.removeScrollWatcher();
    }

    scrollWatcher(scrollTop: number) {
        this.setState({ display: scrollTop > 0 });
    }

    render() {
        if (!this.state.display) {
            return null;
        }

        return (
            <Wrapper onClick={backToTop}>
                <ChevronUpIcon size={20} />
            </Wrapper>
        );
    }
}

export default BackToTopButton;
