import actionTypes from '../actions/actionTypes';

let initialState = {
    company : null,
    plant : null,
    error: "",
};

const SetCompanyPlant = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.GetCompanyPlant_SUCCESS:
            let result = {
                company :  action.payload.company,
                plant :    action.payload.plant,
                error:     "",
            };
            return result;
        default:
            return state;
    }
}

export default SetCompanyPlant;