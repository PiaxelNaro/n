// @flow
import * as api from '../api';
import fetchRecentlyViewed from './recently_viewed';
import mapResultDataObject from './utils';

const authFetch: any = api.authFetch;

jest.mock('../api', () => ({
    authFetch: jest.fn(),
    checkStatus: r => r,
    parseJSON: r => r,
}));

const fakeData = {
    more_url: '',
    data: [
        {
            target_url: '/apps/ios/app/clashroyale/details/',
            company_url: '/company/1000200000016673/',
            uniform_company_platform: '',
            country_code: 'fi',
            publisher_name: 'Supercell',
            market: 'ios',
            uniform_company_type: 'dna_universal_company',
            product_id: 1053012308,
            headerquarters: 'Finland',
            company_name: 'Supercell',
            uniform_company_id: 1000200000016673,
            icon:
                'https://www..com/img/ios/1053012308/778d5f106afe7c228d6ac62fba70b474_w80',
            product_name: 'Clash Royale',
        },
    ],
};

describe('getRecentlyViewed()', () => {
    it('fetch data from server', async () => {
        authFetch.mockImplementation(() => Promise.resolve(fakeData));

        await expect(fetchRecentlyViewed()).resolves.toEqual(
            mapResultDataObject(fakeData)
        );
    });
});
