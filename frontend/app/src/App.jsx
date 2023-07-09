import './App.css'
import Header from "./components/Header/Header.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ToolPage from "./pages/ToolPage/ToolPage.jsx";
function App() {

  return (
    <>
        <Router>
            <div className="App">
                <Header />

                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/analysis' element={<AnalysisPage />} />
                    <Route exact path='/tool' element={<ToolPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    </>
  )
}

export default App
