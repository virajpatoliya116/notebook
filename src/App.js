import './App.css'
import About from './components/About'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert'
import { useState } from 'react'

function App() {
  const [alert, setAlert] = useState(null);  

  const showAlert = (massage, type)=>{
    setAlert({
      msg: massage, 
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <Alert massage="This is amazing react course" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
