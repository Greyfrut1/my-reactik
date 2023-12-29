import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../styles/css/styles.css"
import {BrowserRouter} from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
const helmetContext = {};
ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider context={helmetContext}>
        <Helmet prioritizeSeoTags>
            <title>A fancy webpage</title>
            <link rel="notImportant" href="https://www.chipotle.com" />
            <link rel="canonical" href="https://www.tacobell.com" />
            <meta property="og:title" content="A very important title"/>
        </Helmet>
  <React.StrictMode>

      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </React.StrictMode>
    </HelmetProvider>
)