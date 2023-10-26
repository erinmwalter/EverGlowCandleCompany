import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();

    return <a onClick={() => loginWithRedirect()}>Log In</a>

};

export default LoginButton;
