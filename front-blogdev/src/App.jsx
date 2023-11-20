import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Logout from './pages/Logout/logout'



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App