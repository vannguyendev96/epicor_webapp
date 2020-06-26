import actionTypes from '../actions/actionTypes';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions';
import { checkCookie, getCookie } from '../utils/cookies';

export function getData() {
    const GetData_API_ENDPOINT = 'https://dev.dmsc.com.vn/CustPATC/api/v1/Erp.BO.PartSvc/Parts?$top=10';
    if (checkCookie() !== null) {
        const token = getCookie("token");

        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        };
        return fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.value
            })
            .catch((error) => {
                return error;
            })
    }
    else {
        return "error";
    }

}

function* fetchData() {
    try {
        const data = yield call(getData);
        yield put(actions.getNewSuccess({ data: data }))
    } catch (e) {
        console.log(e);
    }
}
export function* watchFetchData() {
    // create watcher of fetchData function
    yield takeEvery(actionTypes.GetNew_REQUEST, fetchData);
}