// @flow
/* eslint react/no-array-index-key: 0 */

import React from 'react';
import styled from 'styled-components';

import { translate, type I18nType } from '../../modules/i18n';
import FlexGrid from '../FlexGrid';

const FooterContainer = styled.div`
    background-color: #f7f7f7;
    padding: 50px 40px 30px 15px;
    box-sizing: border-box;

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        margin-bottom: 10px;
    }

    li {
        padding: 0 10px;
        display: inline-block;
        line-height: 23px;
    }
`;

const FooterMain = styled.div`
    padding-bottom: 5px;
    padding-left: .5em;
    padding-right: .5em;
`;

const CopyRight = styled.span`
    color: #a7b1ba;
`;

const TextLink = styled.a`
    color: #526273;
    text-decoration: none;
    &:hover,
    &:focus {
        color: #54a4da;
    }
`;

const Img = styled.img`
    vertical-align: middle;
`;

const FooterSub = styled.div`
    border-top: 1px solid #dedede;
    padding-top: 20px;
    margin-top: 20px;
    padding-left: .5em;
    padding-right: .5em;
`;


const Footer = ({ content, i18n }: { content: Object, i18n: I18nType }) =>
    <FooterContainer>
        <FooterMain>
            {content.groups.map((group, index) =>
                <ul key={index}>
                    {group.links.map((link, id) =>
                        <li key={id}>
                            <TextLink href={link.url}>{link.label}</TextLink>
                        </li>
                    )}
                </ul>
            )}
        </FooterMain>
        <FooterSub>
            <FlexGrid>
                <FlexGrid.Item>
                    <ul className="footer-legal">
                        <li>
                            <CopyRight>
                                © {new Date().getFullYear()} Napoleon
                            </CopyRight>
                        </li>
                        <li>
                            <TextLink href="/legal/terms/">条例</TextLink>
                        </li>
                        <li>
                            <TextLink href="/legal/privacy/">权利声明</TextLink>
                        </li>
                    </ul>
                </FlexGrid.Item>
            </FlexGrid>
        </FooterSub>
    </FooterContainer>;

export default translate(Footer);
export { Footer as _Footer };
