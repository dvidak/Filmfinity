import React, { useState } from "react";
import { Logo } from "../components";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/auth";
import { Loader } from "../components/Loader";

import "./login-page-style.css";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    if (response.accessToken) {
      loginUser(response.accessToken)
        .then(() => {
          history.push("/");
          setIsLoading(false);
        })
        .catch(() => {
          alert("Login error");
        });
    }
  };

  return (
    <div className="page-login-wrapper">
      <Logo />
      <h1>Log in required!</h1>
      {!isLoading ? (
        <div className="fb-login">
          <FacebookLogin
            appId="786579368566156"
            autoLoad={false}
            fields="name,email,picture,user_likes"
            callback={responseFacebook}
            onClick={() => setIsLoading(true)}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
