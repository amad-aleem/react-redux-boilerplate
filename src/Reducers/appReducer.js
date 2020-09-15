import * as appActionsConstants from '../constants/app';

const initialState = {
    allBreeds: {}
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case appActionsConstants.GET_ALL_BREEDS:
            return {
                ...state,
                allBreeds: {}
            }
        case appActionsConstants.GET_ALL_BREEDS_SUCCESS:
            return {
                ...state,
                allBreeds: action.payload
            };
        case appActionsConstants.GET_ALL_BREEDS_ERROR:
            return {
                ...state,
                allBreeds: {}
            };
        default:
            return state;
    }
};

export default appReducer;
