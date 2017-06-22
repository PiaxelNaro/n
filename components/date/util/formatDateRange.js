// @flow

export default (startDate: moment$Moment, endDate: moment$Moment) => {
    if (!startDate.isSame(endDate, 'year')) {
        return `${startDate.format('MMM D, YYYY')}-${endDate.format('MMM D, YYYY')}`;
    }

    if (!startDate.isSame(endDate, 'month')) {
        return `${startDate.format('MMM D')}-${endDate.format('MMM D, YYYY')}`;
    }

    return `${startDate.format('MMM D')}-${endDate.format('D, YYYY')}`;
};
