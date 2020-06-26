import actionTypes from '../actions/actionTypes';

let initialState = {
    data : [],
    isLoading: false,
};

const GetNewReducers = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.GetNew_SUCCESS: {
            return {
                data: action.payload.data,
                isLoading: true
            }
        }
        default: return state;
    }
}

export default GetNewReducers;