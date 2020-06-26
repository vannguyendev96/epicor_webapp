import { call, cancelled, fork, put, take,all } from 'redux-saga/effects';
import { Base64 } from 'js-base64';
import { watchIncrement, watchDecrement } from './counterSagas';
import { watchFetchData } from './getNewSagas';
import { watchSetCompanyPlant } from './setCompanyPlantSagas';


export function fakeAuthorize(username, password) {
    const LOGIN_API_ENDPOINT = 'https://dev.dmsc.com.vn/CustPATC/TokenResource.svc/';
    //const LOGIN_API_ENDPOINT = 'https://epic.dmsc.com.vn:8443/TestEpicor1014/TokenResource.svc/';
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Base64.encode(username + ":" + password),
            'Access-Control-Allow-Origin': '*',
        },
    };

    return fetch(LOGIN_API_ENDPOINT, parameters)
        .then(response => {
            var token = "";
            if (response.status === 200) {
                token = Base64.encode(username + ":" + password);
            }
            else {
                token = "error";
            }
            return token;
        })
        .then(json => {
            return json;
        });
}


export function* authorize(username, password) {
    try {
        const token = yield call(fakeAuthorize, username, password)
        yield put({ type: 'LOGIN_SUCCESS' })
        yield put({ type: 'SAVE_TOKEN',  token} );
    } catch (error) {
        yield put({ type: 'LOGIN_ERROR', error })
    }
    finally {
        if (yield cancelled()) {
            yield put({ type: 'LOGIN_CANCELLED' })
        }
    }
}

export function* loginFlow() {
    while (true) {
        const { username, password } = yield take('LOGIN_REQUEST')
        const task = yield fork(authorize, username, password)
        // const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
        // if (action.type === 'LOGOUT') {
        //     yield cancel(task)
        //     yield put({ type: 'DELETE_TOKEN' })
        // }
    }
}

export function* logActions() {
    while (true) {
        const action = yield take('*')
    }
}


export function* counter() {
    yield all([ // gọi nhiều saga
        watchIncrement(),
        watchDecrement(),
        watchFetchData(),
        watchSetCompanyPlant()
    ]);
}

// import { fork } from 'redux-saga/effects';
// import watchUserAuthentication from './watchers';

// export default function* startForman() {
//   yield fork(watchUserAuthentication);
// }