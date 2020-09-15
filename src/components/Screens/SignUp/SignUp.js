import React, { Component } from 'react';
import { reduxForm, Field, change, initialize } from 'redux-form';
import {
    View,
    Image,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import Actions from '../../RouteActions';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import qs from 'qs';
import { parse } from 'search-params'
import * as AsyncStorage from '../../AsyncStorage';

import {
    RESET_CONFIRM_NUMBER
} from '../../constants/actions/auth';

//component
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import FormInput from '../../components/FormInput/FormInput';
import Text from '../../components/Text/Text';
import SignUpBase from "../SignUpBase/SignUpBase";

//images
import { withGetScreen } from 'react-native-getscreen';

//styles
import styles from './styles';
import { formLayout } from '../../generalStyles';

import * as actions from './actions';
import * as signinActions from '../SignInEmail/actions';

//utils
import { notification } from '../../helperFunctions';
import * as redirectActions from '../../globalActions/redirectActions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.lastNameRef = null;
        this.emailRef = null;

        this.renderSignUpForm = this.renderSignUpForm.bind(this);
    }

    componentDidMount() {
        const { getInviteData, verifyInviteToken, emptyInitialValue, currentStep, redirect, location } = this.props;
        AsyncStorage.getAccessToken().then((access_token) => {
            if (access_token && currentStep == 'home') {
                redirect();
                return null;
            }
        })
        let params = parse(location.search);
        const { token } = params
        if (token) {
            verifyInviteToken(token);
        }

        const urlInfo1 = this.props.location.search.split('?');
        const urlParams1 = qs.parse(urlInfo1[1]);
        if (urlParams1.X_User_Token != undefined && urlParams1.X_User_Token.length > 0) {
            let token = urlParams1.X_User_Token;
            this.props.loginUser(token);
        }

        const urlInfo = this.props.location.search.split('?');
        const urlParams = qs.parse(urlInfo[1]);
        if (urlParams1.invitation_token != undefined && urlParams1.invitation_token.length > 0) {
            getInviteData(urlParams.invitation_token);
        }
        else {
            emptyInitialValue();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.formValues.phone_number !== this.props.formValues.phone_number) {
            setTimeout(() => {
                if (this.passwordRef) {
                    this.passwordRef.focus()
                }
            });
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        const { formValues, invitedByUserId } = this.props;
        if (!formValues.first_name || !formValues.last_name || !formValues.email || !formValues.password) {
            notification.ref.show({ message: 'Please fill all mandatory fields', isError: true });
        } else {
            formValues.invitedBy = invitedByUserId
            this.props.onSubmit(formValues)
        }
    }

    renderSignUpForm() {
        const mobile = this.props.isMobile();
        const { signUpLoading, initialValues } = this.props;
        const mainHeading = 'Welcome to Boon'
        const subHeading = 'Please Sign up to be able to use the service'

        return (
            <SignUpBase mobile={mobile} signUpLoading={signUpLoading} mainHeading={mainHeading} subHeading={subHeading}>
                <View>
                    <View style={formLayout.row}>
                        <Field
                            component={FormInput}
                            name='first_name'
                            placeholder='First name *'
                            wrapperStyle={[formLayout.fullWidth]}
                            onSubmitEditing={() => this.lastNameRef.focus()}
                            returnKeyType="next"
                            autoFocus
                        />
                    </View>
                    <View style={formLayout.row}>
                        <Field
                            component={FormInput}
                            name='last_name'
                            placeholder='Last name *'
                            wrapperStyle={[formLayout.fullWidth]}
                            inputRef={ref => this.lastNameRef = ref}
                            onSubmitEditing={() => this.emailRef && this.emailRef.focus()}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={formLayout.row}>
                        <Field
                            component={FormInput}
                            name='email'
                            disabled={Boolean(initialValues && initialValues.email)}
                            placeholder='Email *'
                            wrapperStyle={[formLayout.fullWidth]}
                            inputRef={ref => this.emailRef = ref}
                            returnKeyType="next"
                            keyboardType="email-address"
                        />
                    </View>
                </View>
                <View style={formLayout.row}>
                    <Field
                        component={FormInput}
                        name='password'
                        placeholder='Password *'
                        secureTextEntry
                        wrapperStyle={[formLayout.fullWidth]}
                        inputRef={ref => this.passwordRef = ref}
                        returnKeyType="send"
                    />
                </View>
                <View style={[formLayout.row, { justifyContent: 'center' }]}>
                    <PrimaryButton style={styles.loginButton} onPress={() => Actions.signInEmail()}>
                        <Text style={{ color: '#7d8d8a' }}>I already have an account</Text>
                    </PrimaryButton>
                    <PrimaryButton style={styles.signUpButton} onPress={this.submitForm}>
                        Get Started
              </PrimaryButton>
                </View>
            </SignUpBase>
        );
    }

    render() {
        return this.renderSignUpForm();
    }
}

SignUp = reduxForm({ form: 'signUp', enableReinitialize: true })(withGetScreen(SignUp));

const mapStateToProps = state => {
    return {
        formValues: state.form.signUp && state.form.signUp.values ? state.form.signUp.values : {},
        invitedByUserId: state.authReducer.invitedByUserId,
        signUpLoading: state.authReducer.signUpLoading,
        // initialValues: state.authReducer.inviteData,
        currentStep: state.stepsReducer.step
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setFieldValue: (field, value) => {
            dispatch(change('signUp', field, value));
        },
        onSubmit: formValues => {
            if (formValues.user_data !== undefined) {
                formValues.joined_by_invitation = formValues.user_data.joined_by_invitation
                formValues.account_confirmation = true
                delete formValues.user_data
            }
            dispatch(actions.signUp(formValues));
        },
        verifyInviteToken: (params) => {
            dispatch(actions.verifyInviteToken(params));
        },
        loginUser: token => {
            dispatch(signinActions.loginUserWithToken(token));
        },
        getInviteData: (params) => {
            dispatch(actions.getInviteData(params));
        },
        changeInitialValue: (initialValues) => {
            dispatch(initialize('signUp', initialValues));
        },
        emptyInitialValue: () => {
            dispatch(actions.emptyInitialValues());
        },
        redirect: () => {
            dispatch(redirectActions.redirect());
        },
        signIn: (values) => {
            dispatch(signinActions.signIn(values));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
