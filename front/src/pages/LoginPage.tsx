import React from "react";
import { Logo } from "../components";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/auth";

export function LoginPage () {
    const history = useHistory();

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        if (response.accessToken) {
          loginUser(response.accessToken)
            .then(() => {
                history.push("/home");
            })
            .catch(() => {
              alert('Login error');
            });
        }
      };
    

    return (
        <div className="login-wrapper">
            <Logo />
            <div className="fb-login">           
                <FacebookLogin
                    appId="786579368566156"
                    autoLoad={false}
                    fields="name,email,picture,user_likes"
                    callback={responseFacebook}
                />
            </div>

        </div>
    );
}