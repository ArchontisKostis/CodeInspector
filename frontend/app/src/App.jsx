import './App.css'
import Header from "./components/Header/Header.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage.jsx";
function App() {

  return (
    <>
        <Router>
            <div className="App">
                <Header />

                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/analysis' element={<AnalysisPage />} />
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default App
