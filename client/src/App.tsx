import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Trophies from './pages/Trophies';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Players' element={<Players />} />
                <Route path='/Teams' element={<Teams />} />
                <Route path='/Trophies' element={<Trophies />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
