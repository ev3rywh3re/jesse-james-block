import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css' // Vite uses style.css by default now

const targetElement = document.getElementById('jesse-james-react-app');

if (targetElement) {
  ReactDOM.createRoot(targetElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
