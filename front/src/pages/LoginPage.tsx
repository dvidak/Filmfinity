import React, { useState } from "react";
import { Logo } from "../components";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/auth";
import loader from "../img/loader2.gif";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    if (response.accessToken) {
      loginUser(response.accessToken)
        .then(() => {
          history.push("/home");
          setIsLoading(false);
        })
        .catch(() => {
          alert("Login error");
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
          onClick={() => setIsLoading(true)}
        />
      </div>
      {isLoading && <img className="loader-gif" src={loader} />}
    </div>
  );
}
