// @flow
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import FlexGrid from '../../components/FlexGrid';

const Wrapper = styled.div`
    width: ${props => (props.isCollapsable ? '45px' : '200px')};
    float: left;
`;

const LogoLink = styled.a`
    display: flex;
    padding-left: 15px;
    &.is-collapsable {
        padding-left: 6px;
    }
    &.is-collapsable.is-hover {
        padding-left: 15px;
    }
    align-items: center;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
`;

const LogoDefault = styled(FlexGrid)`
    max-width: 400px;
    align-items: flex-end;
    color: #00bfaa;
    font-size: 9px;
    opacity: 1;
    visibility: visible;
    overflow: hidden;
    &.is-collapsable {
        max-width: 0;
        opacity: 0;
        visibility: hidden;
        transition: opacity .2s, visibility .2s; /* hide */
    }
    &.is-collapsable.is-hover {
        max-width: 400px;
        opacity: 1;
        visibility: visible;
        transition: opacity .25s .2s, visibility .25s .2s; /* show */
    }
`;

const LogoMini = styled(FlexGrid)`
    max-width: 0;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
     &.is-collapsable {
         max-width: 100%;
         opacity: 1;
         visibility: visible;
         transition: opacity .25s .2s, visibility .25s .2s;
    }
    &.is-collapsable.is-hover {
        max-width: 0;
        opacity: 0;
        visibility: hidden;
        transition: opacity .2s, visibility .2s;     /* hide */
    }
`;

const Main = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    float: left;
    background-color: #000;
    color: #FFF;
    font-size: 13px;
    overflow-y: auto;
    overflow-x: hidden;
    &.is-collapsable {
        width: 45px;
        transition: width .25s .2s;
        z-index: 1002;
    }
    &.is-collapsable.is-hover {
        width: 200px;
        transition: width .25s .2s;
        z-index: 1001;
    }
`;
const Content = styled.div`
    opacity: 1;
    visibility: visible;
    &.is-collapsable {
        opacity: 0;
        visibility: hidden;
        transition: opacity .25s .2s, visibility .25s .2s;
    }
    &.is-collapsable.is-hover {
        opacity: 1;
        visibility: visible;
    }
`;

const Mask = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: -9999px;
    z-index: 1000;
    opacity: 0;
    background-color: #000;
    transition: opacity .2s, background-color .2s;
    transition-delay: .25s;
    &.is-collapsable.is-hover {
        left: 0;
        opacity: .3;
    }
`;

const PremiumText = styled.div`
    margin: 0 0 5px 2px;
    color: #00bfaa;
`;

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            isHover: false,
        };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    props: {
        link: string,
        isCollapsable: boolean,
        isPremium: boolean,
        children?: any,
    };

    state: {
        isHover: boolean,
    };

    onMouseEnter: Function;
    onMouseLeave: Function;

    onMouseEnter() {
        this.setState({
            isHover: true,
        });
    }

    onMouseLeave() {
        this.setState({
            isHover: false,
        });
    }

    render() {
        const { link, isCollapsable, isPremium, children } = this.props;
        const classes = classnames({
            'is-collapsable': isCollapsable,
            'is-hover': this.state.isHover,
        });

        let mask;
        if (isCollapsable) {
            mask = <Mask className={classes} />;
        }

        let premiumText;
        if (isPremium) {
            premiumText = <PremiumText>PREMIUM</PremiumText>;
        }
        return (
            <Wrapper isCollapsable={isCollapsable}>
                <Main
                    className={`AASidebar ${classes}`}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >

                    <LogoLink href={link} className={classes}>
                        <LogoMini className={classes}>
                            <Logo mini premium={isPremium} />
                        </LogoMini>
                        <LogoDefault className={classes}>
                            <Logo />
                            {premiumText}
                        </LogoDefault>
                    </LogoLink>

                    <Content className={classes}>
                        {children}
                    </Content>
                </Main>
                {mask}
            </Wrapper>
        );
    }
}

export default Container;
