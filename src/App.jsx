import { useState } from 'react'
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Photoalbums from "./pages/Photoalbums.jsx";
import PhotoalbumsFullPage from "./pages/PhotoAlbumsFullPage.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/photoalbums" element={<Photoalbums />} />
                  <Route path="/photoalbums/:albumsalias" element={<PhotoalbumsFullPage />}/>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
