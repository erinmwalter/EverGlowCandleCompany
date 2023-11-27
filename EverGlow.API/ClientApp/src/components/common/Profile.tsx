import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { Col, Row } from "reactstrap";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <></>;
  }
  else if(!isAuthenticated) {
    return ( 
      <>
        <LoginButton/>
      </>
    );
  }

  return (
     (
      <>
        <img src={user?.picture} alt={user?.name} style={{borderRadius: "50%", height:50, width:50}}/>
      </>
    )
  );
};

export default Profile;