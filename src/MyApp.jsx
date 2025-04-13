import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
// import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Products from './Products.jsx'
import AuthProviders from './providers/AuthProviders.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
// import AuthInterceptor from './AuthInterceptor.jsx'
import NavBar from './NavBar.jsx'

export default function MyApp() {
    const [auth,setAuth] = useState({})
      useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log("hi")
        console.log(loggedInUser)
        if (loggedInUser != undefined) {
          const foundUser = JSON.parse(loggedInUser);
          setAuth(foundUser);
        }
      }, []);

  return (

    <AuthContext.Provider value={{auth,setAuth}}>
    <NavBar  />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/products" element ={<Products />} />
      </Routes>
    </BrowserRouter>
    {/* <Footer /> */}
    </AuthContext.Provider>
   
  )
}
