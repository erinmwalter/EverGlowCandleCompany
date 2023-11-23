import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import ProtectedComponent from '../protected/ProtectedComponent';
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById("app-root")!;
const root = createRoot(container);
const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID as string;

root.render(
  <Router>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{redirect_uri:window.location.origin}}
      >
        <ProtectedComponent component={App} />
      </Auth0Provider>
  </Router>
);

