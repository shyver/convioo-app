'use client'

import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './app';

const Page = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'decwozbfm'}});
  return (
    <Auth0Provider
      domain="dev-bgsimgtdc2ubueui.eu.auth0.com"
      clientId="jB0ItrswUAamPYFccx1XHZCmOGUGZRdB"
      authorizationParams={{
        redirect_uri: 'http://localhost:3000'
      }}
    >
      <App/>
    </Auth0Provider>
  );
};

export default Page;