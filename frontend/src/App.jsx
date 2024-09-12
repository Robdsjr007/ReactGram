import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth';

// estilo
import './styles/app.sass';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';

const App = () => {
  const {auth, loading} = useAuth();

// Carregando componentes
  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={auth ? <Home /> : <Navigate to="/login"/>} />
            <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to="/login"/>} />
            <Route path='/users/:id' element={auth ? <Profile /> : <Navigate to="/login"/>} />
            <Route path='/login' element={!auth ? <Login /> : <Navigate to="/"/> } />
            <Route path='/register' element={!auth ? <Register /> : <Navigate to="/"/>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App