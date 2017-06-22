// @flow
import React from 'react';
import styled from 'styled-components';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FlexGrid from '../FlexGrid';

const PAGE_FIRST = 1;

const FlexItem = styled(FlexGrid.Item).attrs({
    flex: 0,
})`
    font-size: 12px;
    white-space: nowrap;
    color: #666;
`;

const PageInput = styled.input`
    width: 30px;
    height: 18px;
    padding: 0;
    text-align: center;
    border: 1px solid #ccc;
    color: #555;
    outline: none;
`;

const NavButton = styled.button.attrs({
    type: 'button',
})`
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    background-color: #f6f6f6;
    background-image:  linear-gradient(to bottom, #fff, #e9e9e9);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    color: #999;
    cursor: pointer;
    font-size: 0;
    outline: none;
    padding: 3px 4px;
    &:hover,
    &:focus {
        border: 1px solid #aaa;
        background-color: #ddd;
        background-image: linear-gradient(to bottom, #fff, #ddd);
    }
    &:active {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    &[disabled] {
        background-color: #e6e6e6;
        background-image: none;
        opacity: 0.65;
        box-shadow: none;
        cursor: default;
        &:hover,
        &:focus {
            border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25);
            background-color: #f6f6f6;
            background-image: linear-gradient(to bottom, #ffffff, #e9e9e9);
        }
    }
`;

class Pagination extends React.Component {
    constructor(props: { current: number, onPageChange: number => void, total: number }) {
        super(props);
        this.state = {
            inputValue: props.current,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    props: {
        current: number,
        total: number,
        onPageChange: number => void,
    };

    state: {
        inputValue: string | number,
    };

    onInputChange: Function;
    onKeyPress: Function;
    onPrevClick: Function;
    onNextClick: Function;

    onInputChange(event: SyntheticInputEvent) {
        // remove invalided charater
        this.setState({
            inputValue: event.target.value.replace(/[^0-9]/g, ''),
        });
    }

    onKeyPress(event: SyntheticEvent) {
        if (event.key === 'Enter' && this.state.inputValue) {
            const newInputValue = parseInt(this.state.inputValue, 10);
            if (
                !isNaN(newInputValue) &&
                newInputValue >= PAGE_FIRST &&
                newInputValue <= this.props.total
            ) {
                this.props.onPageChange(newInputValue);
            }
        }
    }

    onPrevClick() {
        if (this.props.current === PAGE_FIRST) {
            return;
        }
        this.props.onPageChange(this.props.current - 1);
    }

    onNextClick() {
        if (this.props.current >= this.props.total) {
            return;
        }
        this.props.onPageChange(this.props.current + 1);
    }

    isInputDisabled(type: 'prev' | 'next') {
        if (type === 'prev') {
            return this.props.current <= PAGE_FIRST;
        }

        return this.props.current >= this.props.total;
    }

    componentWillReceiveProps(nextProps: Object) {
        this.setState({
            inputValue: nextProps.current,
        });
    }

    render() {
        return (
            <FlexGrid inline gutter="5px">
                <FlexItem>
                    Go to page
                </FlexItem>
                <FlexItem>
                    <PageInput
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.onInputChange}
                        onKeyPress={this.onKeyPress}
                    />
                </FlexItem>
                <FlexItem>
                    of
                </FlexItem>
                <FlexItem>
                    {this.props.total}
                </FlexItem>
                <FlexItem>
                    <NavButton
                        onClick={this.onPrevClick}
                        disabled={this.isInputDisabled('prev')}
                    >
                        <FaAngleLeft size={15} />
                    </NavButton>
                </FlexItem>
                <FlexItem>
                    <NavButton
                        onClick={this.onNextClick}
                        disabled={this.isInputDisabled('next')}
                    >
                        <FaAngleRight size={15} />
                    </NavButton>
                </FlexItem>
            </FlexGrid>
        );
    }
}

export default Pagination;
