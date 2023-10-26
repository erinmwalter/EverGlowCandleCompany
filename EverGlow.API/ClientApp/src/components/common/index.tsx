import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import ProtectedComponent from '../protected/ProtectedComponent';
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById("app-root")!;
const root = createRoot(container);
const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID as string;
root.render(
  <Auth0Provider
    domain = {domain}
    clientId = {clientId}
    authorizationParams={{redirect_uri: "http://localhost:6955/employee"}}>
  <Router>
    <App />
  </Router>
  </Auth0Provider>
);

