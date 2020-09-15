import * as appActionsConstants from '../../../constants/app';
import * as dogService from '../../../services/dogService';

export function getAllBreeds() {
    return dispatch => {
        dogService.getAllBreedList().then((response) => {
            dispatch({ type: appActionsConstants.GET_ALL_BREEDS_SUCCESS, payload: response.data.message });
        }).catch((e) => {
            console.error(e)
        });
    };
}
