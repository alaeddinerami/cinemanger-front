import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // No need to import ReactDOM here
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from "./router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
