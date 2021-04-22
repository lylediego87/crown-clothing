import { shopActionTypes } from './shop.types';
// import { firestore, convertColletionsSnapshotToMap } from '../../firebase/firebase.utils';

// export const updateCollections = collectionsMap => ({
//   type: shopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap
// });

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

//Below function has been moved to SAGA

// export const fetchCollectionStartAsync = () => {
//   return dispatch => {
//     const collectionRef = firestore.collection('collections');
//     dispatch(dispatch(fetchCollectionStart()));

//     //Normal Api call to firestore
//     collectionRef.get().then(snapshot => {
//       const collectionsMap =  convertColletionsSnapshotToMap(snapshot);
//       dispatch(fetchCollectionSuccess(collectionsMap));
//     }).catch(error => { dispatch(fetchCollectionError(error.message ))});
//   }
// }
 