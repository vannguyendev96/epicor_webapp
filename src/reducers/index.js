import { combineReducers } from 'redux';
import login from './loginReducer';
import counterReducers from './counterReducers';
import getdataReducers from './GetNewReducers';
import SetCompanyPlant from './SetCompanyPlant'

const rootReducer = combineReducers ({
    login,counterReducers,getdataReducers,
    SetCompanyPlant
});

export default rootReducer;