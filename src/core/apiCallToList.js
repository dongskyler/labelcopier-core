import fetch from 'node-fetch';

import { apiPaginationLimit, httpAcceptHeader, httpUriBase } from './apiCallOptions';
import { getLoginInfo, getRepoInfoFromLoginInfo } from './getApiLoginInfo';
import { validateKindOrThrowError } from './validateKind';
import { validateModeOrThrowError } from './validateMode';

export const composeUrlForListingEntries = (
  kind = 'labels',
  pageNum = 1,
  mode = 'list'
) => {
  validateKindOrThrowError(kind);
  validateModeOrThrowError(mode);

  const loginInfo = getLoginInfo();
  const repoOwner = getRepoInfoFromLoginInfo(loginInfo, 'owner', mode);
  const repoName = getRepoInfoFromLoginInfo(loginInfo, 'name', mode);

  let url =
    `${httpUriBase}${repoOwner}/${repoName}/${kind}` +
    `?per_page=${apiPaginationLimit}` +
    `&page=${pageNum}`;

  if (kind === 'milestones') {
    url += '&state=all';
  }

  return url;
};

export const httpGet = (kind = 'labels', pageNum = 1, mode = 'list') => {
  const url = composeUrlForListingEntries(kind, pageNum, mode);

  const headers = {
    Accept: httpAcceptHeader,
    Authorization: 'token',
  };

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(url, options);
};

export const makeApiCallToListEntries = async (kind = 'labels') => {
  const response = await httpGet(kind);
  const fetchedArray = await response.json();
  return fetchedArray;
};