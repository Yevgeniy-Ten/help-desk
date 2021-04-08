import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { facebookAppId } from '../../constants';
import { facebookLogin } from '../../store/action/usersAction';
import { useDispatch } from 'react-redux';

const FacebookLoginButton = () => {
    const dispatch = useDispatch();

    const facebookResponse = (response) => {
        if (response.id) {
            dispatch(facebookLogin(response));
        }
    }
    return (
        <FacebookLogin
            appId={facebookAppId}
            fields="name,email,picture"
            callback={facebookResponse}
        />
    );
};

export default FacebookLoginButton;