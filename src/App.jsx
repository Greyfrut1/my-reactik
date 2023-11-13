import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./pages/News.jsx";
import NewsFullMode from "./pages/NewsFullMode.jsx";
import Events from "./pages/Events.jsx";
import EventsFullMode from "./pages/EventsFullMode.jsx";
function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/news" element={<News />} />
                <Route path="/news/:alias" element={<NewsFullMode />}/>
                <Route path="/events" element={<Events />} />
                <Route path="/events/:alias" element={<EventsFullMode />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
