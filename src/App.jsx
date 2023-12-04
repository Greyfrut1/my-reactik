// Import necessary components and hooks from react-router-dom.
import {BrowserRouter, Route, Routes, Navigate, useParams, useLocation, useNavigate} from "react-router-dom";
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
import EducationalProgramsFullMode from "./pages/EducationalProgramsFullMode.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";

import "../styles/scss/styles.scss"
import FacultyFullMode from "./pages/FacultyFullMode.jsx";
import Subscriber from "./components/Subscriber.jsx";
import Unsubscribe from "./components/Unsubscribe.jsx";
import {ToastContainer} from "react-toastify";
import Search from "./pages/Search.jsx";
import useLanguagePrefix from "./services/languagePrefix.jsx";

// Define the main App component.
function App() {
    const location = useLocation();
    const isUnsubscribePage = location.pathname.startsWith("/simplenews/remove/");

    const [input, setInput] = useState(""); // State to manage the input value
    const navigate = useNavigate(); // Hook to get the navigate function
    const langPrefix = useLanguagePrefix();
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use the navigate function to go to the "/search/result" page with the input value
        navigate(`/${langPrefix}/search/${input}`);
        setInput("")
    };

    // Render the application using react-router-dom for routing.
    return (
    <>
        <LanguageSwitcher />
        {/* Set up BrowserRouter to enable routing in the application. */}
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            {/* Define route configurations using Routes component. */}
            <Routes>
                <Route path="/:lang" element={<Home />} />
                <Route path="/" element={<Navigate to="/en" />} />
                {/* Route for the News page. */}
                <Route path="/:lang/news" element={<News />} />

                {/* Route for the NewsFullMode page with dynamic alias parameter. */}
                <Route path="/:lang/news/:alias" element={<NewsFullMode />}/>

                {/* Route for the Events page. */}
                <Route path="/:lang/events" element={<Events />} />

                {/* Route for the EventsFullMode page with dynamic alias parameter. */}
                <Route path="/:lang/events/:alias" element={<EventsFullMode />}/>

                {/* Route for the Photoalbums page. */}
                <Route path="/:lang/photoalbums" element={<Photoalbums />} />

                {/* Route for the Photoalbums. */}
                <Route path="/:lang/photoalbums/:alias" element={<PhotoAlbumsFullPage />}/>

                {/* Route for the Faculties. */}
                <Route path="/:lang/faculty" element={<Faculties />}/>

                {/* Route for the Faculty. */}
                <Route path="/:lang/faculty/:alias" element={<FacultyFullMode />}/>

                {/* Route for the Unsubscribe from the newsletter. */}
                <Route path={"/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"} element={<Unsubscribe/>}/>

                {/* Route for the Catalog Educational programs. */}
                <Route path="/:lang/all-educations" element={<CatalogEducationalPrograms />}/>

                {/* Route for the Page Educational program. */}
                <Route path="/:lang/educational-programs/:alias" element={<EducationalProgramsFullMode />}/>

                {/* Route for the Search Page. */}
                <Route path="/:lang/search/:result" element={<Search />}/>
            </Routes>

            {!isUnsubscribePage && (
                <div className={"footer-top bg-dark"}>
                    <Subscriber/>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

// Export the App component for use in other parts of the application.
export default App
