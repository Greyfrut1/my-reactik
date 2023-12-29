import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../styles/css/styles.css"
import {BrowserRouter} from "react-router-dom";
import {Helmet} from "react-helmet";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Helmet>
              <title>My Title</title>
              <meta name="description" content="Helmet application"/>
          </Helmet>
          <App/>
      </BrowserRouter>
  </React.StrictMode>,
)
