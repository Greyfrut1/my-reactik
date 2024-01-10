import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import './App.scss';

const Home = lazy(() => import('./pages/Homepage/HomePage.jsx'));
export default function App() {
    return (
        <BrowserRouter>
            <Layout>
            <Suspense>
                <Routes>
                    <Route path="/:lang" element={<Home />} />
                    <Route path="/" element={<Navigate to="/uk" />} />
                </Routes>
            </Suspense>
            </Layout>
        </BrowserRouter>
    );
}


//     const isUnsubscribePage = location.pathname.startsWith("/simplenews/remove/");
//     const [input, setInput] = useState(""); // State to manage the input value
//     const navigate = useNavigate(); // Hook to get the navigate function
//     const handleInputChange = (e) => {
//         setInput(e.target.value);
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Use the navigate function to go to the "/search/result" page with the input value
//         navigate(`/${languagePrefix}/search/${input}`);
//         setInput("")
//     };


//
//     // Render the application using react-router-dom for routing.
//     return (
//     <>
//         <div className="top-header">
//             <div className="top-header_container container">
//         <TopHeaderMenu />
//         <LanguageSwitcher />
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={input} onChange={handleInputChange} />
//                 <button type="submit">Submit</button>
//             </form>
//             </div>
//         </div>




//         <MainMenu />
//             {/* Define route configurations using Routes component. */}
//             <Routes>
//                 <Route path="/:lang" element={<Home />} />
//                 <Route path="/" element={<Navigate to="/uk" />} />
//                  {/*Route for the News page. */}
//                 <Route path="/:lang/news" element={<News />} />
//
//                 {/* Route for the NewsFullMode page with dynamic alias parameter. */}
//                 <Route path="/:lang/news/:alias" element={<NewsFullMode />}/>
//
//                 {/* Route for the Events page. */}
//                 <Route path="/:lang/events" element={<Events />} />
//
//                 {/* Route for the EventsFullMode page with dynamic alias parameter. */}
//                 <Route path="/:lang/events/:alias" element={<EventsFullMode />}/>
//
//                 {/* Route for the Photoalbums page. */}
//                 <Route path="/:lang/photoalbums" element={<Photoalbums />} />
//
//                 {/* Route for the Photoalbums. */}
//                 <Route path="/:lang/photoalbums/:alias" element={<PhotoAlbumsPage />}/>
//
//                 {/* Route for the Faculties. */}
//                 <Route path="/:lang/faculties" element={<Faculties />}/>
//
//                 {/* Route for the Faculty. */}
//                 <Route path="/:lang/faculty/:alias" element={<FacultyFullMode />}/>
//
//                 {/* Route for the Faculty. */}
//                 <Route path="/:lang/department/:alias" element={<DepartmentFullMode/>}/>
//
//                 {/* Route for the Unsubscribe from the newsletter. */}
//                 <Route path={"/:lang/simplenews/remove/:iduser/:idnewsletter/:timestamp/:hash"} element={<Unsubscribe/>}/>
//
//                 {/* Route for the Catalog Educational programs. */}
//                 <Route path="/:lang/all-educations" element={<CatalogEducationalPrograms />}/>
//
//                 {/* Route for the Page Educational program. */}
//                 <Route path="/:lang/educational-programs/:alias" element={<EducationalProgramsFullMode />}/>
//
//                 {/* Route for the Page Rectorate. */}
//                 <Route path="/:lang/rectorate" element={<Rectorate />}/>
//
//                 {/* Route for the Page Academic Board. */}
//                 <Route path="/:lang/academic-council" element={<AcademicBoard />}/>
//
//                 {/* Route for the Staff full page. */}
//                 <Route path="/:lang/staff/:alias" element={<StaffPage />}/>
//
//                 {/* Route for the Page Museum. */}
//                 <Route path="/:lang/museums" element={<Museums />}/>
//
//                 {/* Route for the Page Units. */}
//                 <Route path="/:lang/units" element={<Units />}/>
//
//                 {/* Route for the Page EnsemblesView. */}
//                 <Route path="/:lang/ensembles" element={<EnsemblesView />}/>
//
//                 {/* Route for the Page EnsemblesView. */}
//                 <Route path="/:lang/public-information" element={<PublicInformation />}/>
//
//                 {/* Route for the Page EnsemblesView. */}
//                 <Route path="/:lang/accreditation" element={<AccreditationPage />}/>
//
//                 {/* Route for the Page EnsemblesFullMode. */}
//                 <Route path="/:lang/ensembles/:alias" element={<EnsemblesFullMode />}/>
//
//                 {/* Route for the Page Branches. */}
//                 <Route path="/:lang/branches-and-representative-offices" element={<Branches />}/>
//
//                 {/* Route for the Staff full page. */}
//                 <Route path="/:lang/branches-and-representative-offices/:alias" element={<BranchesFullMode />}/>
//
//                 {/* Route for the Search Page. */}
//                 <Route path="/:lang/search/:result" element={<Search />}/>
//
//                 <Route path="/:lang/general-information/:alias" element={<GeneralInformation />}/>
//
//                 {/* Route for the Infrastructure. */}
//                 <Route path="/:lang/infrastructure" element={<InfrastructureView/>}/>
//
//                 <Route path="/:lang/infrastructure/:alias" element={<InfrastructurePage/>}/>
//
//                 <Route path="/:lang/ukraine_above_all" element={<UkraineAboveAll />}/>
//
//                 <Route path="/:lang/university-rating" element={<UniversityRating />}/>
//
//                 <Route path="/:lang/*" element={<NotFound />}/>
//             </Routes>
//
//             {!isUnsubscribePage && (
//                 <div className={"footer-top bg-dark"}>
//                     <Subscriber/>
//                 </div>
//             )}
//
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="colored"
//             />
//             <Footer />
//         </>
//     )
// }
//
// export default App
