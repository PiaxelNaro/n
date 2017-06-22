// @flow
import { createSelector } from 'reselect';
import * as api from '../api';
import mapResultDataObject from './utils';

const apiUrl = () => '/search/recently_viewed/?num=8';

const fetchRecentlyViewed = createSelector(apiUrl, url =>
    api
        .authFetch(url)
        .then(r => api.checkStatus(r))
        .then(api.parseJSON)
        .then(r => mapResultDataObject(r))
);

export default fetchRecentlyViewed;
