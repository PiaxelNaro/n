// @flow
import React from 'react';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
    @font-face {
        font-family: 'aaicon';
        src: url(/static/aaicon/aaicon.eot);
        src: url(/static/aaicon/aaicon.eot#iefix) format('embedded-opentype'),
            url(/static/aaicon/aaicon.woff) format('woff'),
            url(/static/aaicon/aaicon.ttf) format('truetype'),
            url(/static/aaicon/aaicon.svg#inapp) format('svg');
    }
`;

const RawAAIcon = styled.i`
    font-family: "aaicon";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    speak: none;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.aaicon-aa-caret-down:before {
        content: "\\EA01";
    }
    &.aaicon-aa-caret-right:before {
        content: "\\EA02";
    }
    &.aaicon-aa-company:before {
        content: "\\EA03";
    }
    &.aaicon-aa-connections:before {
        content: "\\EA04";
    }
    &.aaicon-aa-home:before {
        content: "\\EA05";
    }
    &.aaicon-aa-lock:before {
        content: "\\EA06";
    }
    &.aaicon-ad-expense-o:before {
        content: "\\EA07";
    }
    &.aaicon-ad-monetization-o:before {
        content: "\\EA08";
    }
    &.aaicon-ad-revenue-o:before {
        content: "\\EA09";
    }
    &.aaicon-angry:before {
        content: "\\EA0A";
    }
    &.aaicon-api-o:before {
        content: "\\EA0B";
    }
    &.aaicon-app-db-o:before {
        content: "\\EA0C";
    }
    &.aaicon-app-store-views-o:before {
        content: "\\EA0D";
    }
    &.aaicon-app_estimates:before {
        content: "\\EA0E";
    }
    &.aaicon-apps-o:before {
        content: "\\EA0F";
    }
    &.aaicon-audience-int-o:before {
        content: "\\EA10";
    }
    &.aaicon-backup-data-o:before {
        content: "\\EA11";
    }
    &.aaicon-breadcrumb-arrow:before {
        content: "\\EA12";
    }
    &.aaicon-chart_column:before {
        content: "\\EA13";
    }
    &.aaicon-chart_line:before {
        content: "\\EA14";
    }
    &.aaicon-company-o:before {
        content: "\\EA15";
    }
    &.aaicon-compare-apps-o:before {
        content: "\\EA16";
    }
    &.aaicon-connections-o:before {
        content: "\\EA17";
    }
    &.aaicon-creatives-o:before {
        content: "\\EA18";
    }
    &.aaicon-daily-ranks-o:before {
        content: "\\EA19";
    }
    &.aaicon-dashboard-o:before {
        content: "\\EA1A";
    }
    &.aaicon-data-availability-o:before {
        content: "\\EA1B";
    }
    &.aaicon-data-sharing-o:before {
        content: "\\EA1C";
    }
    &.aaicon-downloads-o:before {
        content: "\\EA1D";
    }
    &.aaicon-events-o:before {
        content: "\\EA1E";
    }
    &.aaicon-exclamation:before {
        content: "\\EA1F";
    }
    &.aaicon-featured-o:before {
        content: "\\EA20";
    }
    &.aaicon-hand-pointer:before {
        content: "\\EA21";
    }
    &.aaicon-hourglass-half:before {
        content: "\\EA22";
    }
    &.aaicon-in-app-icon:before {
        content: "\\EA23";
    }
    &.aaicon-in-app-purchase-o:before {
        content: "\\EA24";
    }
    &.aaicon-inapppurchase:before {
        content: "\\EA25";
    }
    &.aaicon-index-o:before {
        content: "\\EA26";
    }
    &.aaicon-info-circle:before {
        content: "\\EA27";
    }
    &.aaicon-info-o:before {
        content: "\\EA28";
    }
    &.aaicon-keywords-explorer-o:before {
        content: "\\EA29";
    }
    &.aaicon-keywords-o:before {
        content: "\\EA2A";
    }
    &.aaicon-keywords:before {
        content: "\\EA2B";
    }
    &.aaicon-learn:before {
        content: "\\EA2C";
    }
    &.aaicon-mark-check:before {
        content: "\\EA2D";
    }
    &.aaicon-market-size-o:before {
        content: "\\EA2E";
    }
    &.aaicon-marketing-int-o:before {
        content: "\\EA2F";
    }
    &.aaicon-metric_picker:before {
        content: "\\EA30";
    }
    &.aaicon-newsfeed:before {
        content: "\\EA31";
    }
    &.aaicon-parent-company-o:before {
        content: "\\EA32";
    }
    &.aaicon-parent_company:before {
        content: "\\EA33";
    }
    &.aaicon-paying-user-o:before {
        content: "\\EA34";
    }
    &.aaicon-payment-info-o:before {
        content: "\\EA35";
    }
    &.aaicon-pick-your-apps-o:before {
        content: "\\EA36";
    }
    &.aaicon-pick-your-companies-o:before {
        content: "\\EA37";
    }
    &.aaicon-plus-circle:before {
        content: "\\EA38";
    }
    &.aaicon-publisher-o:before {
        content: "\\EA39";
    }
    &.aaicon-publisher_app:before {
        content: "\\EA3A";
    }
    &.aaicon-purchase-history-o:before {
        content: "\\EA3B";
    }
    &.aaicon-rank-history-o:before {
        content: "\\EA3C";
    }
    &.aaicon-rating-o:before {
        content: "\\EA3D";
    }
    &.aaicon-remove:before {
        content: "\\EA3E";
    }
    &.aaicon-report:before {
        content: "\\EA3F";
    }
    &.aaicon-revenue-o:before {
        content: "\\EA40";
    }
    &.aaicon-reviews-o:before {
        content: "\\EA41";
    }
    &.aaicon-right:before {
        content: "\\EA42";
    }
    &.aaicon-service-api-o:before {
        content: "\\EA43";
    }
    &.aaicon-service-o:before {
        content: "\\EA44";
    }
    &.aaicon-small-plus-circle:before {
        content: "\\EA45";
    }
    &.aaicon-smile:before {
        content: "\\EA46";
    }
    &.aaicon-store-int-o:before {
        content: "\\EA47";
    }
    &.aaicon-store-stats-pro-o:before {
        content: "\\EA48";
    }
    &.aaicon-subscriptions-o:before {
        content: "\\EA49";
    }
    &.aaicon-timeline-o:before {
        content: "\\EA4A";
    }
    &.aaicon-top-charts-o:before {
        content: "\\EA4B";
    }
    &.aaicon-top-matrix-o:before {
        content: "\\EA4C";
    }
    &.aaicon-usage-o:before {
        content: "\\EA4D";
    }
    &.aaicon-user-o:before {
        content: "\\EA4E";
    }
    &.aaicon-user-retension-o:before {
        content: "\\EA4F";
    }
    &.aaicon-users-o:before {
        content: "\\EA50";
    }
`;

const AAIcon = ({ name }: { name: string }) => (
    <RawAAIcon className={`aaicon aaicon-${name}`} />
);

export default AAIcon;
