import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import './App.scss';

const HomePage = lazy(() => import('./pages/Homepage/HomePage.jsx'));

const PhotoAlbumsPage = lazy(() => import('./pages/PhotoAlbumsPage/PhotoAlbumsPage.jsx'));
const PhotoAlbumsViewPage = lazy(() => import('./views/PhotoAlbums/PhotoAlbumsView.jsx'));

const InfrastructurePage = lazy(() => import('./pages/Infrastructure/InfrastructurePage.jsx'));
const InfrastructureViewPage = lazy(() => import('./views/InfrastructureView/InfrastructureView.jsx'));

const Rectorate = lazy(() => import('./views/RectorateView.jsx'));
const StaffPage = lazy(() => import('./pages/StaffPage/StaffPage.jsx'));
const AcademicCouncil = lazy(() => import('./views/AcademicBoardView.jsx'));

const Museums = lazy(() => import('./pages/MuseumsPage.jsx'));
const Units = lazy(() => import('./pages/UnitsPage.jsx'));
const Branches = lazy(() => import('./pages/AllBranchesPage.jsx'));
const BranchesPage = lazy(() => import('./pages/BranchesPage/BranchesPage.jsx'));

const GeneralInformationPage = lazy(() => import('./pages/GeneralInformationPage.jsx'));

const DepartmentPage = lazy(() => import('./pages/DepartmentFullMode.jsx'));
const Faculties = lazy(() => import('./pages/Faculties/Faculties.jsx'));
const FacultyPage = lazy(() => import('./pages/Faculties/FacultyFullMode.jsx'));


export default function App() {
    return (
        <BrowserRouter>
            <Layout>
            <Suspense>
                <Routes>
                    <Route path="/:lang" element={<HomePage />} />
                    <Route path="/" element={<Navigate to="/uk" />} />

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

                    <Route path="/:lang/general-information/:alias" element={<GeneralInformationPage/>}/>

                    <Route path="/:lang/department/:alias" element={<DepartmentPage/>}/>
                    <Route path="/:lang/faculties" element={<Faculties/>}/>
                    <Route path="/:lang/faculty/:alias" element={<FacultyPage/>}/>

                </Routes>
            </Suspense>
            </Layout>
        </BrowserRouter>
    );
}
