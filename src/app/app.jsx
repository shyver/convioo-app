'use client'

import { useAuth0 } from '@auth0/auth0-react'

const App = () => {
    const {isAuthenticated, loginWithRedirect}=useAuth0();
  return isAuthenticated ? (<div> applikation</div>) : (loginWithRedirect())
}

export default App