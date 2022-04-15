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
import TeamForm from './components/teams/TeamForm';
import TrophyForm from './components/trophies/TrophyForm';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Trophies from './pages/Trophies';
import { store } from './store/store';

function App() {
    return (
        <Router>
            <ToastContainer
                style={{ width: 'fit-content' }}
                position='bottom-right'
                theme='colored'
            />
            <Navbar />
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='players'>
                        <Route index={true} element={<Players />} />
                        <Route path='add' element={<PlayerFormAdd />} />
                        <Route path=':id' element={<PlayerDetailed />} />
                        <Route path=':id/edit' element={<PlayerFormEdit />} />
                    </Route>
                    <Route path='teams'>
                        <Route index={true} element={<Teams />} />
                        <Route path='add' element={<TeamForm />} />
                        <Route path=':id' element={<TeamDetailed />} />
                    </Route>
                    <Route path='trophies'>
                        <Route index={true} element={<Trophies />} />
                        <Route path='add' element={<TrophyForm />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Provider>
            <Footer />
        </Router>
    );
}

export default App;
