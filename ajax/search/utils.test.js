import mapResultDataObject from './utils';

describe('mapResultDataObject()', () => {
    it('parse empty result', async () => {
        expect(mapResultDataObject({})).resolves.toEqual({
            results: [],
        });
    });
});
