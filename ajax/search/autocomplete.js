// @flow
import qs from 'querystring';
import { createSelector } from 'reselect';
import * as api from '../api';
import mapResultDataObject from './utils';

const getApiUrl = (term: string) => {
    const query = {
        top_n: 10,
        q: term,
    };
    return `/search/autocomplete/?${qs.stringify(query)}`;
};

const fetchSearchSuggestions = createSelector(
    params => getApiUrl(params),
    url =>
        api
            .authFetch(url)
            .then(r => api.checkStatus(r))
            .then(api.parseJSON)
            .then(r => mapResultDataObject(r))
);

export default fetchSearchSuggestions;
