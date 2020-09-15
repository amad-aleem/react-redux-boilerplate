import { StyleSheet } from 'react-native';
import { $green } from '../../generalStyles';

export default StyleSheet.create({
    pageWrapper: {
        justifyContent: 'space-between'
    },
    signUpForm: {
        width: '42%',
        paddingHorizontal: 70,
        paddingVertical: 35,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 45,
        paddingBottom: 15,
        backgroundColor: $green
    },
    nonMobileHeader: {
        backgroundColor: '#EBF0F3'
    },
    backButton: {
        position: 'absolute',
        top: 68,
        left: 32
    },
    avatar: {
        height: 64,
        width: 64,
        borderRadius: 32
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boonHeading: {
        fontSize: 70,
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        marginBottom: 15
    },
    signupText: {
        fontSize: 19,
        color: '#fff',
        marginBottom: 80
    },
    body: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 90
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
        position: 'relative'
    },
    coverButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 10
    },
    halfWidthLeft: {
        width: '50%',
        marginRight: 8
    },
    halfWidthRight: {
        width: '50%',
        marginLeft: 8
    },
    fullWidth: {
        width: '100%'
    },
    signUpButton: {
        marginTop: 20,
        width: '47%',
    },
    loginButton: {
        marginTop: 20,
        width: '47%',
        backgroundColor: '#d5dbda',
        color: '#7d8d8a',
        marginRight: 20,
        textAlign: 'center'
    },
    alreadyHaveWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alreadyHaveText: {
        fontSize: 14,
        marginRight: 5
    },
    alreadyHaveButtonText: {
        fontSize: 14,
        color: $green
    },
    checkIcon: {
        position: 'absolute',
        top: 18,
        left: 153,
        height: 20,
        width: 20
    },
    logoWrapper: {
        flexShrink: 1,
        flexGrow: 0,
        paddingTop: 100,
        paddingBottom: 80,
        position: 'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 165,
        height: 40,
        flexGrow: 0,
        flexShrink: 1,
        resizeMode: 'contain'
    },
    mobileLogoWrapper: {
        paddingTop: 80,
        paddingBottom: 80,
        alignItems: 'center',
    },
    mobileLogo: {
        width: 115,
        height: 30,
        flexGrow: 0,
        flexShrink: 1,
        resizeMode: 'contain'
    },
    mobileBoonHeading: {
        fontSize: 40,
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        marginBottom: 15,
        textAlign: 'center'
    },
    mobileSignupText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 80,
        textAlign: 'center'
    },
    mobileSignUpForm: {
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});
