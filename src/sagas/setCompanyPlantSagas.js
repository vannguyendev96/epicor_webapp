import actionTypes from '../actions/actionTypes';
import { takeEvery, put } from 'redux-saga/effects';

import * as actions from '../actions';




function* setData(action) {
    try {
        yield put(actions.geCompanyPlantSuccess({ company: action.company, plant: action.plant}))
    } catch (e) {
        console.log(e);
    }
}


export function* watchSetCompanyPlant() {
    // create watcher of fetchData function
    yield takeEvery(actionTypes.GetCompanyPlant_REQUEST, setData);
} 