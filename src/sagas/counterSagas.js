import actionTypes from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects';

function* increment() {
    yield console.log('this is increment saga', 1111);
}

function* decrement() {
    yield console.log('this is decrement saga', 2222);
}

export function* watchIncrement() {
    yield takeEvery(actionTypes.INCREMENT, increment);
}

export function* watchDecrement() {
    yield takeEvery(actionTypes.DECREMENT, decrement);
}