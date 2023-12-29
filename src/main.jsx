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
              <meta property="og:title" content="How to Become an SEO Expert (8 Steps)"/>
              <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps."/>
              <meta property="og:image"
                    content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png"/>
          </Helmet>
          <App/>
      </BrowserRouter>
  </React.StrictMode>,
)
