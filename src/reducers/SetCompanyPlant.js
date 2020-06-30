import actionTypes from '../actions/actionTypes';

let initialState = {
    company : null,
    plant : null,
    error: "",
};

const SetCompanyPlant = (state = initialState , action) => {
    let newState;
    switch (action.type) {
        case actionTypes.GetCompanyPlant_SUCCESS:
            // console.log("Set")
            // let result = {
            //     company :  action.payload.company,
            //     plant :    action.payload.plant,
            //     error:     "",
            // };
            // return result;
            newState = { ...state, company: action.payload.company,plant : action.payload.plant,error:"" };
            newState.company = action.payload.company;
            newState.plant = action.payload.plant;
            return newState;
        default:
            return state;
    }
}

export default SetCompanyPlant;