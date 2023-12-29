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
              <meta property="og:url" content="https://my-reactik.vercel.app/en"/>
              <meta property="og:type" content="website"/>
              <meta property="og:title" content="VNtsetesttestU"/>
              <meta property="og:description" content="123123"/>
              <meta property="og:image" content=""/>

              <meta name="twitter:card" content="summary_large_image"/>
              <meta property="twitter:domain" content="my-reactik.vercel.app"/>
              <meta property="twitter:url" content="https://my-reactik.vercel.app/en"/>
              <meta name="twitter:title" content="123123123"/>
              <meta name="twitter:description" content="123213"/>
              <meta name="twitter:image" content=""/>
          </Helmet>
          <App/>
      </BrowserRouter>
  </React.StrictMode>,
)
