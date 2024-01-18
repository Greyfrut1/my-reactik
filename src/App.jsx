import {lazy, Suspense, useContext, useEffect, useRef, useState} from 'react';
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import './App.scss';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));

const PhotoAlbumsPage = lazy(() => import('./pages/PhotoAlbumsPage/PhotoAlbumsPage.jsx'));
const PhotoAlbumsViewPage = lazy(() => import('./views/PhotoAlbums/PhotoAlbumsView.jsx'));

const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage/InfrastructurePage.jsx'));
const InfrastructureViewPage = lazy(() => import('./views/InfrastructureView/InfrastructureView.jsx'));

const Rectorate = lazy(() => import('./views/RectorateView.jsx'));
const StaffPage = lazy(() => import('./pages/StaffPage/StaffPage.jsx'));
const AcademicCouncil = lazy(() => import('./views/AcademicBoardView.jsx'));

const Museums = lazy(() => import('./pages/MuseumsPage.jsx'));
const Units = lazy(() => import('./pages/UnitsPage.jsx'));
const Branches = lazy(() => import('./pages/AllBranchesPage.jsx'));
const BranchesPage = lazy(() => import('./pages/BranchesPage/BranchesPage.jsx'));

const GeneralInfoPage = lazy(() => import('./pages/GeneralInformationPage.jsx'));
const PublicInfoPage = lazy(() => import('./pages/PublicInformationPage.jsx'));

const DepartmentPage = lazy(() => import('./pages/DepartmentPage/DepartmentPage.jsx'));

const Faculties = lazy(() => import('./views/FacultyView/FacultyView.jsx'));
const FacultyPage = lazy(() => import('./pages/FacultyPage/FacultyPage.jsx'));

const UkraineAboveAllPage = lazy(() => import('./pages/UkraineAboveAll/UkraineAboveAll.jsx'));
const EnsemblesView = lazy(() => import('./views/EnsemblesView.jsx'));
const EnsemblesPage = lazy(() => import('./pages/EnsemblesPage/EnsemblesPage.jsx'));

const UniversityRating = lazy(() => import('./pages/UniversityRating/UniversityRating.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));

const UnSubscribe = lazy(() => import('./blocks/Subscriber/UnSubscriber.jsx'));

const EducationalProgramsView = lazy(() => import('./views/EducationalProgramsView.jsx'));
const EducationalProgramsPage = lazy(() => import('./pages/EducationalPrograms/EducationalProgramsPage.jsx'));

const News = lazy(() => import('./pages/News/News.jsx'));
const NewsPage = lazy(() => import('./pages/News/NewsFullMode.jsx'));

const Events = lazy(() => import('./views/EventsView/EventsView.jsx'));
const EventsPage = lazy(() => import('./pages/EventPage/EventPage.jsx'));

import {LoadingContext} from "./context/loading-context.jsx";
import loader_logo from "/src/assets/loader-logo.png";
export default function App() {
    const { loadingState } = useContext(LoadingContext);
    const [loading, setLoading] = useState(false);
    const loadingStateRef = useRef(loadingState);
    const getNetworkSpeed = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return connection ? connection.downlink : null;
    };

// Використання швидкості мережі для динамічного часу очікування
    const calculateTimeout = () => {
        const networkSpeed = getNetworkSpeed();
        console.log(networkSpeed)
        return networkSpeed ? Math.max(300, 5000 / networkSpeed) : 300;
    };
    loadingStateRef.current = loadingState
    useEffect(() => {
        console.log(calculateTimeout())
        setTimeout(() => {
            console.log(loadingStateRef.current)
            const hasLoading = Object.values(loadingStateRef.current).length > 0 && Object.values(loadingStateRef.current).every(value => value === true);
            if (hasLoading) {
                setLoading(true);
            } else {
                setLoading(false);
            }
            setTimeout(() => {
                console.log('time')
                console.log(loadingStateRef.current)
                if (Object.values(loadingStateRef.current).length === 0) {
                    setLoading(true);
                }
            }, 100)
        }, calculateTimeout());
    }, [loadingState]);
    return (
        <BrowserRouter>
            <Layout>
            <Suspense>
                <Routes>
                    <Route path="/:lang" element={<HomePage />} />
                    <Route path="/" element={<Navigate to="/en" />} />

                    <Route path="/:lang/photoalbums" element={<PhotoAlbumsViewPage />} />
                    <Route path="/:lang/photoalbums/:alias" element={<PhotoAlbumsPage />} />

                    <Route path="/:lang/infrastructure" element={<InfrastructureViewPage />} />
                    <Route path="/:lang/infrastructure/:alias" element={<InfrastructurePage />} />


                    <Route path="/:lang/rectorate" element={<Rectorate/>}/>
                    <Route path="/:lang/academic-council" element={<AcademicCouncil/>}/>
                    <Route path="/:lang/staff/:alias" element={<StaffPage/>}/>

                    <Route path="/:lang/museums" element={<Museums/>}/>
                    <Route path="/:lang/units" element={<Units/>}/>
                    <Route path="/:lang/branches-and-representative-offices" element={<Branches/>}/>
                    <Route path="/:lang/branches-and-representative-offices/:alias" element={<BranchesPage/>}/>

                    <Route path="/:lang/general-information/:alias" element={<GeneralInfoPage/>}/>
                    <Route path="/:lang/public-information" element={<PublicInfoPage/>}/>

                    <Route path="/:lang/department/:alias" element={<DepartmentPage/>}/>
                    <Route path="/:lang/faculties" element={<Faculties/>}/>
                    <Route path="/:lang/faculty/:alias" element={<FacultyPage/>}/>

                    <Route path="/:lang/ukraine_above_all" element={<UkraineAboveAllPage/>}/>
                    <Route path="/:lang/ensembles/:alias" element={<EnsemblesPage/>}/>
                    <Route path="/:lang/ensembles" element={<EnsemblesView/>}/>

                    <Route path="/:lang/university-rating" element={<UniversityRating/>}/>
                    <Route path="/:lang/search/:result" element={<Search/>}/>

                    <Route path={"/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"}
                           element={<UnSubscribe/>}/>

                    <Route path="/:lang/faculties" element={<Faculties/>}/>
                    <Route path="/:lang/faculty/:alias" element={<FacultyPage/>}/>

                    <Route path="/:lang/all-educations" element={<EducationalProgramsView/>}/>
                    <Route path="/:lang/educational-programs/:alias" element={<EducationalProgramsPage/>}/>

                    <Route path="/:lang/news" element={<News/>}/>
                    <Route path="/:lang/news/:alias" element={<NewsPage/>}/>

                    <Route path="/:lang/events" element={<Events/>}/>
                    <Route path="/:lang/events/:alias" element={<EventsPage/>}/>

                    <Route path="/:lang/*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
            </Layout>
            {!loading && (<div className={'loader-block'}><img src={loader_logo} alt={`loader-logo`}/></div>)}
        </BrowserRouter>
    );
}
