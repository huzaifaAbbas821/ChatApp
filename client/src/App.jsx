import { useState } from "react";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import {Routes , Route , Navigate} from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import "./App.css";

function App() {
  const {authUser} = useAuthContext();
  const token = localStorage.getItem("token");

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={ authUser && token ? <Home/> : <Navigate to="/login" /> }/>
        <Route path="/login" element={token ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/signup" element={token ?<Navigate to="/"/> : <Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
