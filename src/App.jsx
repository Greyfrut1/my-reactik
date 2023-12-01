// Import necessary components and hooks from react-router-dom.
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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

import "../styles/scss/styles.scss"
import FacultyFullMode from "./pages/FacultyFullMode.jsx";
import Subscriber from "./components/Subscriber.jsx";
import Unsubscribe from "./components/Unsubscribe.jsx";
import {ToastContainer} from "react-toastify";
import Search from "./pages/Search.jsx";
import {useState} from "react";

// Define the main App component.
function App() {
    const location = useLocation();
    const isUnsubscribePage = location.pathname.startsWith("/simplenews/remove/");

    const [input, setInput] = useState(""); // State to manage the input value
    const navigate = useNavigate(); // Hook to get the navigate function

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use the navigate function to go to the "/search/result" page with the input value
        navigate(`/search/${input}`);
        setInput("")
    };

    // Render the application using react-router-dom for routing.
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            {/* Define route configurations using Routes component. */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                {/* Route for the News page. */}
                <Route path="/news" element={<News/>}/>

                {/* Route for the NewsFullMode page with dynamic alias parameter. */}
                <Route path="/news/:alias" element={<NewsFullMode/>}/>

                {/* Route for the Events page. */}
                <Route path="/events" element={<Events/>}/>

                {/* Route for the EventsFullMode page with dynamic alias parameter. */}
                <Route path="/events/:alias" element={<EventsFullMode/>}/>

                {/* Route for the Photoalbums page. */}
                <Route path="/photoalbums" element={<Photoalbums/>}/>

                {/* Route for the Photoalbums. */}
                <Route path="/photoalbums/:alias" element={<PhotoAlbumsFullPage/>}/>

                {/* Route for the Faculties. */}
                <Route path="/faculty" element={<Faculties/>}/>

                {/* Route for the Faculty. */}
                <Route path="/faculty/:alias" element={<FacultyFullMode/>}/>

                {/* Route for the Unsubscribe from the newsletter. */}
                <Route path={"/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"} element={<Unsubscribe/>}/>

                {/* Route for the Catalog Educational programs. */}
                <Route path="/all-educations" element={<CatalogEducationalPrograms />}/>

                {/* Route for the Page Educational program. */}
                <Route path="/educational-programs/:alias" element={<EducationalProgramsFullMode />}/>

                {/* Route for the Search Page. */}
                <Route path="/search/:result" element={<Search />}/>
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
