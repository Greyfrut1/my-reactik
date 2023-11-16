// Import necessary components and hooks from react-router-dom.
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from 'react'
import Home from "./pages/Home.jsx";

// Import page components for News and Events.
import News from "./pages/News.jsx";
import NewsFullMode from "./pages/NewsFullMode.jsx";
import Events from "./pages/Events.jsx";
import EventsFullMode from "./pages/EventsFullMode.jsx";

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
            </Routes>
        </BrowserRouter>
    </>
  )
}

// Export the App component for use in other parts of the application.
export default App
