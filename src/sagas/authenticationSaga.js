import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import { fakeAuthorize } from '../services/authenticationService';

//import * as types from '../actions';


export function* authorize(username, password) {
    try {
        console.log("call" + username + password)
        const token = yield call(fakeAuthorize, username, password)
        yield put({ type: 'LOGIN_SUCCESS' })
        yield put({ type: 'SAVE_TOKEN', token });
    } catch (error) {
        yield put({ type: 'LOGIN_ERROR', error })
    }
    finally {
        if (yield cancelled()) {
            yield put({ type: 'LOGIN_CANCELLED' })
        }
    }
}
