// src/main.jsx - Version 3 - Connected Redux Store + Router
// Chain: store -> Provider gives store to whole app -> BrowserRouter gives routing -> App -> Navbar + Pages can use both Redux and Router
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux' // Import Provider from react-redux
import { store } from './redux/store' // Import store from your easy name redux folder
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)