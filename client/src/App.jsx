import { Routes, Route } from 'react-router-dom'
import Auth from './components/authentication'

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Auth />} />
        {/* <Route path='/register' element={<Register />} /> */}
      </Routes>
    </>
  )
}

export default App
