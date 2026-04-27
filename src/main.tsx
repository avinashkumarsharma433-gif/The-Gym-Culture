import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.addEventListener('error', (event) => {
  document.body.innerHTML += `<div style="position:fixed;top:0;left:0;z-index:9999;background:red;color:white;padding:20px;">${event.error ? event.error.stack : event.message}</div>`;
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
