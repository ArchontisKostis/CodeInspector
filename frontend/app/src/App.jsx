import './App.css'
import Header from "./components/Header/Header.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ToolPage from "./pages/ToolPage/ToolPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import About from "./pages/About/About.jsx";
function App() {

  return (
    <>
        <Router>
            <div className="App">
                <Header />

                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/analysis/*' element={<AnalysisPage />} />
                    <Route exact path='/tool' element={<ToolPage />} />
                    <Route exact path='/about' element={<About />} />
                    <Route path='*' element={<h1>404 Not Found</h1>} />
                    {/* Error Page */}
                    <Route path='*' element={<ErrorPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    </>
  )
}

export default App
