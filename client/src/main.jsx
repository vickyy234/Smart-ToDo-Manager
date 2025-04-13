import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './main.css'
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL='http://localhost:5001/'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
