// Import necessary components and hooks from react-router-dom.
import {Route, Routes, Navigate, useLocation, useNavigate} from "react-router-dom";
import { useState } from 'react'
import Home from "./pages/Homepage/Homepage.jsx";
import './App.scss';
import News from "./pages/News/News.jsx";
import NewsFullMode from "./pages/News/NewsFullMode.jsx";
import Events from "./pages/Event/Events.jsx";
import EventsFullMode from "./pages/Event/EventsFullMode.jsx";
import Photoalbums from "./pages/Photoalbums/Photoalbums.jsx";
import PhotoAlbumsFullPage from "./pages/Photoalbums/PhotoAlbumsFullPage.jsx";
import CatalogEducationalPrograms from "./pages/EducationalProgram/CatalogEducationalPrograms.jsx";
import Faculties from "./pages/Faculties/Faculties.jsx";
import EducationalProgramsFullMode from "./pages/EducationalProgram/EducationalProgramsFullMode.jsx";
import LanguageSwitcher from "./blocks/Header/LanguageSwitcher.jsx";
import useLanguagePrefix from "./services/languagePrefix.jsx";
import Footer from "./blocks/Footer/Footer.jsx";

import FacultyFullMode from "./pages/Faculties/FacultyFullMode.jsx";
import Subscriber from "./blocks/Subscriber/Subscriber.jsx";
import Unsubscribe from "./blocks/Subscriber/Unsubscribe.jsx";
import {ToastContainer} from "react-toastify";
import Search from "./pages/Search.jsx";
import DepartmentFullMode from "./pages/DepartmentFullMode.jsx";
import StaffPage from "./pages/Staff/StaffPage.jsx";
import Rectorate from "./pages/Staff/Rectorate.jsx";
import AcademicBoard from "./pages/Staff/AcademicBoard.jsx";
import Menu from "./blocks/Header/Menu/Menu.jsx";
import GeneralInformation from "./pages/GeneralInformation.jsx";
import Museums from "./pages/Museum/Museums.jsx";
import Units from "./pages/Branches/Units.jsx";
import Branches from "./pages/Branches/Branches.jsx";
import BranchesFullMode from "./pages/Branches/BranchesFullMode.jsx";
import InfrastructureView from "./views/InfrastructureView/InfrastructureView.jsx";
import InfrastructurePage from "./pages/Infrastucture/InfrastructurePage.jsx";
import EnsemblesView from "./pages/Ensembles/EnsemblesPage.jsx";
import EnsemblesFullMode from "./pages/Ensembles/EnsemblesFullMode.jsx";
import PublicInformation from "./pages/PublicInformation.jsx";
import AccreditationPage from "./pages/EducationalProgram/AccreditationPage.jsx";
import TopHeaderMenu from "./blocks/Header/Menu/TopHeaderMenu.jsx";
import UkraineAboveAll from "./pages/UkraineAboveAll/UkraineAboveAll.jsx";
import UniversityRating from "./pages/UniversityRating/UniversityRating.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
    const languagePrefix = useLanguagePrefix();
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
        navigate(`/${languagePrefix}/search/${input}`);
        setInput("")
    };

    // Render the application using react-router-dom for routing.
    return (
    <>
        <div className="top-header">
            <div className="top-header_container container">
        <TopHeaderMenu />
        <LanguageSwitcher />
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
        <Menu />
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
                <Route path="/:lang/faculties" element={<Faculties />}/>

                {/* Route for the Faculty. */}
                <Route path="/:lang/faculty/:alias" element={<FacultyFullMode />}/>

                {/* Route for the Faculty. */}
                <Route path="/:lang/department/:alias" element={<DepartmentFullMode/>}/>

                {/* Route for the Unsubscribe from the newsletter. */}
                <Route path={"/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"} element={<Unsubscribe/>}/>

                {/* Route for the Catalog Educational programs. */}
                <Route path="/:lang/all-educations" element={<CatalogEducationalPrograms />}/>

                {/* Route for the Page Educational program. */}
                <Route path="/:lang/educational-programs/:alias" element={<EducationalProgramsFullMode />}/>

                {/* Route for the Page Rectorate. */}
                <Route path="/:lang/rectorate" element={<Rectorate />}/>

                {/* Route for the Page Academic Board. */}
                <Route path="/:lang/academic-council" element={<AcademicBoard />}/>

                {/* Route for the Staff full page. */}
                <Route path="/:lang/staff/:alias" element={<StaffPage />}/>

                {/* Route for the Page Museum. */}
                <Route path="/:lang/museums" element={<Museums />}/>

                {/* Route for the Page Units. */}
                <Route path="/:lang/units" element={<Units />}/>

                {/* Route for the Page EnsemblesView. */}
                <Route path="/:lang/ensembles" element={<EnsemblesView />}/>

                {/* Route for the Page EnsemblesView. */}
                <Route path="/:lang/public-information" element={<PublicInformation />}/>

                {/* Route for the Page EnsemblesView. */}
                <Route path="/:lang/accreditation" element={<AccreditationPage />}/>

                {/* Route for the Page EnsemblesFullMode. */}
                <Route path="/:lang/ensembles/:alias" element={<EnsemblesFullMode />}/>

                {/* Route for the Page Branches. */}
                <Route path="/:lang/branches-and-representative-offices" element={<Branches />}/>

                {/* Route for the Staff full page. */}
                <Route path="/:lang/branches-and-representative-offices/:alias" element={<BranchesFullMode />}/>

                {/* Route for the Search Page. */}
                <Route path="/:lang/search/:result" element={<Search />}/>

                <Route path="/:lang/general-information/:alias" element={<GeneralInformation />}/>

                {/* Route for the Infrastructure. */}
                <Route path="/:lang/infrastructure" element={<InfrastructureView/>}/>

                <Route path="/:lang/infrastructure/:alias" element={<InfrastructurePage/>}/>

                <Route path="/:lang/ukraine_above_all" element={<UkraineAboveAll />}/>

                <Route path="/:lang/university-rating" element={<UniversityRating />}/>

                <Route path="/:lang/*" element={<NotFound />}/>
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
            <Footer />
        </>
    )
}

export default App
