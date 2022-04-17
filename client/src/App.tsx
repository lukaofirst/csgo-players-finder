import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import PlayerDetailed from './components/players/PlayerDetailed';
import PlayerFormAdd from './components/players/PlayerFormAdd';
import PlayerFormEdit from './components/players/PlayerFormEdit';
import TeamDetailed from './components/teams/TeamDetailed';
import TeamFormAdd from './components/teams/TeamFormAdd';
import TeamFormEdit from './components/teams/TeamFormEdit';
import TrophyFormAdd from './components/trophies/TrophyFormAdd';
import TrophyFormEdit from './components/trophies/TrophyFormEdit';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Trophies from './pages/Trophies';
import { store } from './store/store';

function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

    useEffect(() => {
        window.addEventListener(
            'resize',
            () => {
                const ismobile = window.innerWidth < 1200;
                if (ismobile !== isMobile) setIsMobile(ismobile);
            },
            false
        );
    }, [isMobile]);

    return (
        <Router>
            <ToastContainer
                style={{ width: 'fit-content' }}
                position='bottom-right'
                theme='colored'
            />
            <Navbar isMobile={isMobile} />
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<Home isMobile={isMobile} />} />
                    <Route path='players'>
                        <Route index={true} element={<Players />} />
                        <Route path='add' element={<PlayerFormAdd />} />
                        <Route path=':id' element={<PlayerDetailed />} />
                        <Route path=':id/edit' element={<PlayerFormEdit />} />
                    </Route>
                    <Route path='teams'>
                        <Route index={true} element={<Teams />} />
                        <Route path='add' element={<TeamFormAdd />} />
                        <Route path=':id' element={<TeamDetailed />} />
                        <Route path=':id/edit' element={<TeamFormEdit />} />
                    </Route>
                    <Route path='trophies'>
                        <Route index={true} element={<Trophies />} />
                        <Route path='add' element={<TrophyFormAdd />} />
                        <Route path=':id/edit' element={<TrophyFormEdit />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Provider>
            <Footer isMobile={isMobile} />
        </Router>
    );
}

export default App;
