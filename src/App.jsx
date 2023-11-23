// Import necessary components and hooks from react-router-dom.
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from 'react'
import Home from "./pages/Home.jsx";

// Import page components for News and Events.
import News from "./pages/News.jsx";
import NewsFullMode from "./pages/NewsFullMode.jsx";
import Events from "./pages/Events.jsx";
import EventsFullMode from "./pages/EventsFullMode.jsx";
import Photoalbums from "./pages/Photoalbums";
import PhotoAlbumsFullPage from "./pages/PhotoAlbumsFullPage";
import CatalogEducationalPrograms from "./pages/CatalogEducationalPrograms.jsx";
import Faculties from "./pages/Faculties.jsx";

import "../styles/scss/styles.scss"
import FacultyFullMode from "./pages/FacultyFullMode.jsx";
// Define the main App component.
function App() {

    // Render the application using react-router-dom for routing.
    return (
    <>
        {/* Set up BrowserRouter to enable routing in the application. */}
        <BrowserRouter>
            {/* Define route configurations using Routes component. */}
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Route for the News page. */}
                <Route path="/news" element={<News />} />

                {/* Route for the NewsFullMode page with dynamic alias parameter. */}
                <Route path="/news/:alias" element={<NewsFullMode />}/>

                {/* Route for the Events page. */}
                <Route path="/events" element={<Events />} />

                {/* Route for the EventsFullMode page with dynamic alias parameter. */}
                <Route path="/events/:alias" element={<EventsFullMode />}/>

                {/* Route for the Photoalbums page. */}
                <Route path="/photoalbums" element={<Photoalbums />} />

                {/* Route for the Photoalbums. */}
                <Route path="/photoalbums/:alias" element={<PhotoAlbumsFullPage />}/>

                {/* Route for the Faculties. */}
                <Route path="/faculty" element={<Faculties />}/>

                {/* Route for the Faculty. */}
                <Route path="/faculty/:alias" element={<FacultyFullMode />}/>

                {/* Route for the Catalog Educational programs. */}
                <Route path="/all-educations" element={<CatalogEducationalPrograms />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

// Export the App component for use in other parts of the application.
export default App
