// @flow
import React from 'react';
import styled from 'styled-components';
import FlexGrid from '../../FlexGrid';
import AppIcon from '../../AppIcon';
import { sprintf, type I18nType } from '../../../modules/i18n';

const MAX_DISPLAY_APP_COUNT = 10;
const Wrapper = styled.div`
    border-bottom: 1px solid #F2F2F2;
`;

const Notice = styled.p`
    margin: 10px 0;
    color: #102235;
`;

const AppList = ({
    apps,
    i18n,
}: {
    apps: Array<{ id: number, icon: string, store: string }>,
    i18n: I18nType,
}) => {
    const { gettext } = i18n;
    let displayedApps = apps;
    let moreApps = null;
    if (apps.length > MAX_DISPLAY_APP_COUNT) {
        const displayCount = MAX_DISPLAY_APP_COUNT - 1;
        displayedApps = apps.slice(0, displayCount);
        moreApps = (
            <span className="js-more-apps-marker">
                {sprintf(gettext('+%d more'), apps.length - displayCount)}
            </span>
        );
    }

    const selectedApps = displayedApps.map(app =>
        <AppIcon key={app.id} src={app.icon} store={app.store} size="medium" />
    );

    return (
        <Wrapper>
            <FlexGrid gutter="10px">
                {selectedApps}
                {moreApps}
            </FlexGrid>
            <Notice>
                {gettext(
                    'We will automatically add selected apps across platforms and devices.'
                )}
            </Notice>
        </Wrapper>
    );
};

export default AppList;
