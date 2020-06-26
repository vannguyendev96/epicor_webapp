import actionTypes from '../actions/actionTypes';

const counterReducers = (times = 0, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return times + action.step;
        case actionTypes.DECREMENT:
            return times - action.step;
        default:
            return times;
    }
}

export default counterReducers;