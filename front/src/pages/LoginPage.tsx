import React from "react";
import { Logo } from "../components";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";

export function LoginPage () {

    const history = useHistory();

    const routeChange = () =>{ 
        history.push("/home");
    }

    return (
        <div className="loginWrapper">
            <Logo />
            <div className="fbLogin">           
                <FacebookLogin
                    appId="3030721947029486"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={routeChange}
                    callback={() => {}}
                />
            </div>

        </div>
    );
}