import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

window.backendUrl = 'https://story-app-back-end.up.railway.app/';
// window.backendUrl = 'http://localhost:3000/';
// window.fontendUrl = 'http://localhost:5173/';
window.fontendUrl = 'https://storyfy1.netlify.app/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
