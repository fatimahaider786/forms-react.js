import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; 
import App from './App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem("loginToken");

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <Routes>
         {/* Agar token hai toh App (Dashboard) dikhao, warna Login */}
         <Route path="/" element={token ? <App /> : <Navigate to="/login" />} />
         <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
         <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
      </Routes>
   </BrowserRouter>
);