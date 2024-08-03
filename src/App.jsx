import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutLayout from "./components/layouts/AboutLayout";
import AuthenticationLayout from "./components/layouts/AuthenticationLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import About from "./pages/About/About";
import Privacy from "./pages/About/Privacy";
import Artist from "./pages/Artist/Artist";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Gallery from "./pages/Gallery/Gallery";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route element={<AboutLayout />}>
            <Route path='/about' element={<About />} />
            <Route path='/privacy' element={<Privacy />} />
          </Route>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/artist' element={<Artist />} />
        </Route>
        <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;