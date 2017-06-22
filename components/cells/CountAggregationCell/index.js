// @flow
import React from 'react';
import styled from 'styled-components';
import { translate, sprintf, type I18nType } from '../../../modules/i18n';
import Overlay from '../../Overlay';

const Link = styled.a`
    color: #102235;
`;

const ListItem = styled.div`
    margin: 10px;
    font-size: 13px;
    max-width: 180px;
`;

const _CountAggregationOverlay = ({
    count,
    link,
    items,
    i18n,
    Row,
}: {
    count: number,
    link: string,
    items: Array<Object>,
    i18n: I18nType,
    Row: Class<React$Component<void, any, any>>,
}) => {
    let moreLink;
    if (count > 10) {
        moreLink = (
            <ListItem>
                <Link href={link}>
                    {sprintf(i18n.gettext(`+ %d more`), count)}
                </Link>
            </ListItem>
        );
    }

    // NOTE: We're using index as keys because the API doesn't give us ids. We should fix this
    /* eslint-disable react/no-array-index-key */
    return (
        <Overlay showArrow>
            {items.map((item: { name: string }, i) =>
                <ListItem key={i}>
                    <Row {...item} />
                </ListItem>
            )}
            {moreLink}
        </Overlay>
    );
    /* eslint-enable react/no-array-index-key */
};

const CountAggregationOverlay = translate(_CountAggregationOverlay);

const CountAggregationCell = ({
    count,
    link,
    items,
    Row,
}: {
    count: number,
    link: string,
    items: Array<Object>,
    Row: Class<React$Component<void, any, any>>,
}) =>
    <Overlay.Trigger
        trigger="hover"
        getOverlay={() =>
            <CountAggregationOverlay count={count} link={link} items={items} Row={Row} />}
    >
        <Link href={link}>{count}</Link>
    </Overlay.Trigger>;

export { _CountAggregationOverlay };
export default CountAggregationCell;
