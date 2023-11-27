import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
    const {user, loginWithRedirect} = useAuth0();
    if (!user){
    return <a onClick={() => loginWithRedirect()}>Log In</a>
    }
    else {
        return (<></>)
    }

};

export default LoginButton;
