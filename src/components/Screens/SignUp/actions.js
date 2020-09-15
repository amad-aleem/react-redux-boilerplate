import Actions from '../../RouteActions';
import { reset } from 'redux-form';

import * as authActionsConstants from '../../constants/actions/auth';
import * as stepsActionsConstants from '../../constants/actions/stepsActions';
import * as appActionsConstants from '../../constants/actions/appActions';
import * as authService from '../../services/authService';
import baseService from '../../services/baseService';
import { getDeviceFingerprint } from '../../AsyncStorage';
import { getOrganizationsInvites } from '../../globalActions/organizationsActions';
import responseCodes from '../../constants/responseCodes';
import { notification } from '../../helperFunctions';

export function signUp(formData) {
    let service = authService.signUp;

    if (formData.sign_up_token) {
        service = authService.signUpLinkedIn
    } else if (formData.continueSignup) {
        service = authService.signUpInvite
    }

    return (dispatch) => {
        dispatch({ type: appActionsConstants.SET_SPINNER_HIDDEN });
        dispatch({ type: authActionsConstants.SIGN_UP });
        getDeviceFingerprint().then(deviceFingerprint => {
            service({
                ...formData,
                'device_fingerprint': deviceFingerprint
            }).then(response => {
                baseService.addAuthToken(response.data.payload.access_token).then(() => {
                    dispatch({ type: authActionsConstants.SIGN_UP_SUCCESS, payload: response.data.payload });
                    dispatch({ type: appActionsConstants.SET_SPINNER_HIDDEN });
                    dispatch({ type: stepsActionsConstants.GET_STEP_SUCCESS, payload: response.data.payload.current_incomplete_step });
                    Actions.confirmPhone();
                });
            }).catch(response => {
                dispatch({ type: authActionsConstants.SIGN_UP_ERROR });
                dispatch({ type: appActionsConstants.SET_SPINNER_HIDDEN });
                dispatch({ type: authActionsConstants.SIGN_UP_ERROR, payload: response.data.error });
                notification.ref.show({ message: response.data.error, isError: true });
                // if (response.data.response_code === responseCodes.PHONE_NUMBER_REQUIRED) {
                //     if (response.data.payload.user) {
                //         const { user: { first_name, last_name, email, workplace, company_position } } = response.data.payload;
                //         Actions.confirmPhone({
                //             initialValues: {
                //                 company_position,
                //                 follow_company_name: workplace,
                //                 first_name,
                //                 last_name,
                //                 email,
                //                 password: formData.password
                //             }
                //         });
                //     }
                // }
                // if (response.data.response_code === responseCodes.ACCOUNT_IS_NOT_CONFIRMED) {
                //     Actions.magicLink({
                //         hideBackLink: true,
                //         email: formData.email,
                //         skipInitialSending: true,
                //         confirmationFlow: true
                //     });
                // }
            });
        });
    };
}

export function verifyInviteToken(data) {
    return dispatch => {
        authService.validateUserInviteToken(data).then((response) => {
            dispatch({ type: authActionsConstants.SIGN_UP_CURRENT_USER_ID, payload: response.data.payload });
        }).catch((e) => {
            console.error(e);
        });
    };
}

export function getInviteData(data) {
    return dispatch => {
        authService.validateInvitationToken(data).then((response) => {
            dispatch({ type: authActionsConstants.GET_USER_INVITE_DATA_SUCCESS, payload: response.data.payload });
        }).catch((e) => {
            console.error(e);
        });
    };
}

export function emptyInitialValues(data) {
    return dispatch => {
        dispatch({ type: authActionsConstants.GET_USER_INVITE_DATA_ERROR });
    };
}
