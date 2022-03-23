import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import PlayerForm from './components/players/PlayerForm';
import TeamForm from './components/teams/TeamForm';
import TrophyForm from './components/trophies/TrophyForm';
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
                <Route path='players'>
                    <Route index={true} element={<Players />} />
                    <Route path='add-player' element={<PlayerForm />} />
                </Route>
                <Route path='teams'>
                    <Route index={true} element={<Teams />} />
                    <Route path='add-team' element={<TeamForm />} />
                </Route>
                <Route path='trophies'>
                    <Route index={true} element={<Trophies />} />
                    <Route path='add-trophy' element={<TrophyForm />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
