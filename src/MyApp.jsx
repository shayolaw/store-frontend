import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import App from './App.jsx'
import Login from './Login.jsx'
import Products from './Products.jsx'
import Shop from './Shop.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import NavBar from './NavBar.jsx'

export default function MyApp() {
    const [auth,setAuth] = useState({})
      useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        // console.log(loggedInUser)
        if (loggedInUser != undefined) {
          const foundUser = JSON.parse(loggedInUser);
          setAuth(foundUser);
        }
      }, []);

  return (

    <AuthContext.Provider value={{auth,setAuth}}>
    <NavBar  />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/products" element ={<Products />} />
        <Route path="/shop" element = {<Shop />} />
      </Routes>
    {/* <Footer /> */}
    </AuthContext.Provider>
   
  )
}
