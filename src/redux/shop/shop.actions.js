import { shopActionTypes } from './shop.types';

export const fetchCollectionStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionError = errorMsg => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMsg
});
