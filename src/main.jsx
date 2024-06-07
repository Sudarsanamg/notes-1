import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="746844960339-7qiipfiaihnpoortq6mj0demdupd3p8v.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>;

    
  </React.StrictMode>,
)
