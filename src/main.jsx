import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css';
import Home from './Home/Home'
import { Provider } from 'react-redux'
import { store } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <Home />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
