import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './main.css'
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL='https://smart-todo-manager.onrender.com'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
