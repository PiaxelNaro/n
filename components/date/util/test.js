// @flow
import moment from 'moment';
import formatDateRange from './formatDateRange';

describe('formatDateRange()', () => {
    it('formats date range spawning different years', () => {
        expect(
            formatDateRange(moment([2017, 2, 1]), moment([2015, 5, 7])),
        ).toMatchSnapshot();
    });

    it('formats date range spawning different months', () => {
        expect(
            formatDateRange(moment([2017, 1, 3]), moment([2017, 5, 16])),
        ).toMatchSnapshot();
    });

    it('formats date range within the same month', () => {
        expect(
            formatDateRange(moment([2017, 8, 11]), moment([2017, 8, 22])),
        ).toMatchSnapshot();
    });
});
