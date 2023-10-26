import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <></>;
  }

  return (
     (
      <div>
        <img src={user?.picture} alt={user?.name} style={{borderRadius: "50%", height:50, width:50}}/>
        <p>Welcome!</p>
      </div>
    )
  );
};

export default Profile;