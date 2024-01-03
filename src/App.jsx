// Import necessary components and hooks from react-router-dom.
import {Route, Routes, Navigate, useLocation, useNavigate} from "react-router-dom";
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
import useLanguagePrefix from "./services/languagePrefix.jsx";
import Footer from "./components/Footer.jsx";

import "../styles/scss/styles.scss"
import FacultyFullMode from "./pages/FacultyFullMode.jsx";
import Subscriber from "./components/Subscriber.jsx";
import Unsubscribe from "./components/Unsubscribe.jsx";
import {ToastContainer} from "react-toastify";
import Search from "./pages/Search.jsx";
import DepartmentFullMode from "./pages/DepartmentFullMode.jsx";
import StaffFullMode from "./pages/StaffFullMode.jsx";
import Rectorate from "./pages/Rectorate.jsx";
import AcademicBoard from "./pages/AcademicBoard.jsx";
import Menu from "./components/Menu.jsx";
import GeneralInformation from "./pages/GeneralInformation.jsx";
import Museums from "./pages/Museums.jsx";
import Units from "./pages/Units.jsx";
import Branches from "./pages/Branches.jsx";
import BranchesFullMode from "./pages/BranchesFullMode.jsx";
import InfrastructureViews from "./pages/InfrastructureViews.jsx";
import InfrastructureFullMode from "./pages/InfrastructureFullMode.jsx";
import EnsemblesView from "./pages/EnsemblesView.jsx";
import EnsemblesFullMode from "./pages/EnsemblesFullMode.jsx";
import PublicInformation from "./pages/PublicInformation.jsx";
import AccreditationView from "./pages/AccreditationView.jsx";
import TopHeaderMenu from "./components/TopHeaderMenu.jsx";
import UkraineAboveAll from "./pages/UkraineAboveAll.jsx";
import UniversityRating from "./pages/UniversityRating.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header.jsx";

// Define the main App component.
function App() {
    const languagePrefix = useLanguagePrefix();
    const location = useLocation();
    const isUnsubscribePage = location.pathname.startsWith("/simplenews/remove/");
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const [input, setInput] = useState(""); // State to manage the input value
    const navigate = useNavigate(); // Hook to get the navigate function
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use the navigate function to go to the "/search/result" page with the input value
        navigate(`/${languagePrefix}/search/${input}`);
        setInput("")
    };

    const toggleMenuDialog = () => {
        setShowMenuDialog(!showMenuDialog);
        if(showMenuDialog){
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
       // Переключення видимості при кожному кліку
    };


    // Render the application using react-router-dom for routing.
    return (
        <>
            <header className={'header'}>
                <div className={'header__burger-bar'} onClick={toggleMenuDialog}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30" fill="none">
                        <path
                            d="M0 1.95652C0 0.875974 0.866555 0 1.93548 0H38.0645C39.1334 0 40 0.875974 40 1.95652C40 3.03707 39.1334 3.91304 38.0645 3.91304H1.93548C0.866555 3.91304 0 3.03707 0 1.95652ZM0 15C0 13.9195 0.866555 13.0435 1.93548 13.0435H38.0645C39.1334 13.0435 40 13.9195 40 15C40 16.0805 39.1334 16.9565 38.0645 16.9565H1.93548C0.866555 16.9565 0 16.0805 0 15ZM0 28.0435C0 26.963 0.866555 26.087 1.93548 26.087H38.0645C39.1334 26.087 40 26.963 40 28.0435C40 29.124 39.1334 30 38.0645 30H1.93548C0.866555 30 0 29.124 0 28.0435Z"
                            fill="black"/>
                    </svg>
                </div>
                <Header />
                <div className={'header__right-block'}>
                <LanguageSwitcher/>
                <form onSubmit={handleSubmit}>
                    <input className={'search-input'} type="text" value={input} onChange={handleInputChange}/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                             viewBox="0 0 50 50">
                            <path
                                d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                        </svg>
                    </button>
                </form>
                </div>
            </header>
            <div className={`menu-dialog ${showMenuDialog ? 'show' : ''}`}>
                <div onClick={toggleMenuDialog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="menu-cross">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div className="menu_container">
                    <Menu/>
                    <TopHeaderMenu/>
                </div>
            </div>

            {/* Define route configurations using Routes component. */}
            <Routes>
                <Route path="/:lang" element={<Home/>}/>
                <Route path="/" element={<Navigate to="/en"/>}/>
                {/* Route for the News page. */}
                <Route path="/:lang/news" element={<News/>}/>

                {/* Route for the NewsFullMode page with dynamic alias parameter. */}
                <Route path="/:lang/news/:alias" element={<NewsFullMode/>}/>

                {/* Route for the Events page. */}
                <Route path="/:lang/events" element={<Events/>}/>

                {/* Route for the EventsFullMode page with dynamic alias parameter. */}
                <Route path="/:lang/events/:alias" element={<EventsFullMode/>}/>

                {/* Route for the Photoalbums page. */}
                <Route path="/:lang/photoalbums" element={<Photoalbums/>}/>

                {/* Route for the Photoalbums. */}
                <Route path="/:lang/photoalbums/:alias" element={<PhotoAlbumsFullPage/>}/>

                {/* Route for the Faculties. */}
                <Route path="/:lang/faculties" element={<Faculties/>}/>

                {/* Route for the Faculty. */}
                <Route path="/:lang/faculty/:alias" element={<FacultyFullMode/>}/>

                {/* Route for the Faculty. */}
                <Route path="/:lang/department/:alias" element={<DepartmentFullMode/>}/>

                {/* Route for the Unsubscribe from the newsletter. */}
                <Route path={"/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"}
                       element={<Unsubscribe/>}/>

                {/* Route for the Catalog Educational programs. */}
                <Route path="/:lang/all-educations" element={<CatalogEducationalPrograms/>}/>

                {/* Route for the Page Educational program. */}
                <Route path="/:lang/educational-programs/:alias" element={<EducationalProgramsFullMode/>}/>

                {/* Route for the Page Rectorate. */}
                <Route path="/:lang/rectorate" element={<Rectorate/>}/>

                {/* Route for the Page Academic Board. */}
                <Route path="/:lang/academic-council" element={<AcademicBoard/>}/>

                {/* Route for the Staff full page. */}
                <Route path="/:lang/staff/:alias" element={<StaffFullMode/>}/>

                {/* Route for the Page Museum. */}
                <Route path="/:lang/museums" element={<Museums/>}/>

                {/* Route for the Page Units. */}
                <Route path="/:lang/units" element={<Units/>}/>

                {/* Route for the Page EnsemblesView. */}
                <Route path="/:lang/ensembles" element={<EnsemblesView/>}/>

                {/* Route for the Page EnsemblesView. */}
                <Route path="/:lang/public-information" element={<PublicInformation/>}/>

                {/* Route for the Page EnsemblesView. */}
                <Route path="/:lang/accreditation" element={<AccreditationView/>}/>

                {/* Route for the Page EnsemblesFullMode. */}
                <Route path="/:lang/ensembles/:alias" element={<EnsemblesFullMode/>}/>

                {/* Route for the Page Branches. */}
                <Route path="/:lang/branches-and-representative-offices" element={<Branches/>}/>

                {/* Route for the Staff full page. */}
                <Route path="/:lang/branches-and-representative-offices/:alias" element={<BranchesFullMode/>}/>

                {/* Route for the Search Page. */}
                <Route path="/:lang/search/:result" element={<Search/>}/>

                <Route path="/:lang/general-information/:alias" element={<GeneralInformation/>}/>

                {/* Route for the Infrastructure. */}
                <Route path="/:lang/infrastructure" element={<InfrastructureViews/>}/>

                <Route path="/:lang/infrastructure/:alias" element={<InfrastructureFullMode/>}/>

                <Route path="/:lang/ukraine_above_all" element={<UkraineAboveAll/>}/>

                <Route path="/:lang/university-rating" element={<UniversityRating/>}/>

                <Route path="/:lang/*" element={<NotFound/>}/>
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
            <Footer/>
        </>
    )
}

// Export the App component for use in other parts of the application.
export default App
