import { Routes, Route } from 'react-router-dom'
import Auth from './components/authentication'
import Home from './components/home'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
