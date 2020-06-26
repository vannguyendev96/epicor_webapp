import { takeLatest } from 'redux-saga/effects';
import { authorize } from './authenticationSaga';

import * as types from '../actions/actionTypes';


export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_REQUEST, authorize);
}