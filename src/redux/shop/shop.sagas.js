import { all, takeLatest, call, put } from 'redux-saga/effects';

import { firestore , convertColletionsSnapshotToMap } from '../../firebase/firebase.utils';
import { shopActionTypes } from './shop.types';
import { fetchCollectionSuccess, fetchCollectionError } from './shop.actions';

export function* fetchCollectionAsync() {
  
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertColletionsSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionsMap));

  } catch (error) {
    yield put(fetchCollectionError(error.message));
  } 
}

export function* fetchCollectionStart() {
  yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionAsync)
}

export function* shopSagas() {
  yield all([call(fetchCollectionStart)])
}