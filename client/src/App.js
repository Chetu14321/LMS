
import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import Home from "./pages/Default/Home";
import Login from "./pages/Auth/Login";
import Rigister from "./pages/Auth/Register";
import Dashboard from "./pages/Default/Dashboard";
import NotFound from "./pages/Default/NotFound";
import Menu from "./Component/Menu";
import ProtectedRoute from "./AuthGuard/ProtectRoute";


function App() {
  return (
  <BrowserRouter>
        <Menu/>
        <ToastContainer autoClose={4000} position="top-right"/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Rigister />} />
          <Route  element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />

          </Route>
      
          <Route path="*" element={<NotFound />} />
        </Routes>


  </BrowserRouter>
  );
}

export default App;
