import * as types from './actionTypes';


// export function loggedIn() {
//   return { type: types.LOGGED_IN };
// }

export const incrementAction = (step) => {
  return {
    type: types.INCREMENT,
    step: step
  }
};

export const decrementAction = (step) => {
  return {
    type: types.DECREMENT,
    step: step
  }
};

export const getNewAction = () => {
  return {
    type: types.GetNew_REQUEST
  }
};

export const getNewSuccess = ({data}) => ({
  type: types.GetNew_SUCCESS,
  payload: { data }
})

//set company and plant
// export const getCompanyPlantAction = ({company,plant}) => {
//   return {
//     type: types.GetCompanyPlant_REQUEST,
//     company: company,
//     plant: plant
//   }
// };

export const getCompanyPlantAction = ({company,plant}) => {
  return {
    type: types.GetCompanyPlant_REQUEST,
    payload:{
      company: company,
      plant: plant
    }
  }
};


export const geCompanyPlantSuccess = ({company,plant}) => ({
  type: types.GetCompanyPlant_SUCCESS,
  payload: { company,plant }
})
