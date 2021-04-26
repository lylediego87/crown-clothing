import { takeLatest, put, all, call } from 'redux-saga/effects';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';
import userActionTypes from './user.types';
import { auth,googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { pushNotification } from '../notification/notification.actions';
import uniqid from 'uniqid';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const snapshot = yield userRef.get();
    yield put(signInSuccess( {id: snapshot.id, ...snapshot.data() } ));
    const title = `Welcome ${snapshot.data().displayName}`;
    yield put(pushNotification({title: title, message: "You have succesfully signed in", id: uniqid()}))

  } catch (error) {
    yield put(signInFailure(error));
  } 
}

export function* signInWithGoogle() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
    yield put(pushNotification({title: "Error", message: "Incorrect email or password", id: uniqid(), level: 'error'}))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if(!userAuth) return

    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield put(pushNotification({title: "Signed Out", message: "Goodbye", id: uniqid()}))
  } catch (error) {
    yield put(signOutFailure(error)) ;
  }
}

export function* signUp({payload: {displayName, email,password}}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email,password);
    yield put(signUpSuccess({user, additionalData: { displayName }}));

  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
} 

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart), 
    call(onGoogleSignInStart), 
    call(onEmailSignInStart), 
    call(onCheckUserSession), 
    call(onSignOutStart), 
    call(onSignUpStart), 
    call(onSignUpSuccess)]);
}