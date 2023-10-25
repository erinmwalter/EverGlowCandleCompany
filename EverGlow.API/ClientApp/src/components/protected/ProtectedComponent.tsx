import React, { Component } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

// @ts-ignore
const ProtectedComponent = ({ component, ...propsForComponent }) => {
  const Cp = withAuthenticationRequired(component);
  return <Cp {...propsForComponent} />;
};

export default ProtectedComponent;