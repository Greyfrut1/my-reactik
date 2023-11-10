import News from "./pages/News.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import NewsFullMode from "./pages/NewsFullMode.jsx";
function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/news" element={<News />} />
                <Route path="/news/:newsalias" element={<NewsFullMode />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
