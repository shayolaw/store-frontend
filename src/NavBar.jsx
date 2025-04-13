import React, { useContext, useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, redirect, useNavigate } from "react-router";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {auth,setAuth} = useContext(AuthContext);

   function logout(){
    alert("here")
    setAuth({})
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav className="bg-indigo-700  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">ShopMate</div>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex space-x-6 text-white">
            <a href="#" className="hover:text-red-500 text-white">Home</a>
            <a href="#" className="hover:text-blue-500 text-white">Shop</a>
            <a href="/products" className="hover:text-blue-500">About</a>
            <a href="" className="hover:text-blue-500">Contact</a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search for products..."
              className="border rounded-l-md px-3 py-2 w-full focus:outline-none bg-white"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-white hover:border-green hover:text-black">
              Search
            </button>
          </div>

          {/* Icons: Cart & User */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-white hover:text-blue-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>

            {/* User Dropdown */}
            <div className="cursor-pointer hover:text-blue-500">
            {
                auth.email=== undefined ?
                <span>
                    <a href="/login">Login</a>
                </span> :
                 <span>
                <p class="text-white">Welcome {auth.name}</p>
                 <a class="text-white" onClick={logout}>Logout</a>
             </span>
            }
            
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Shop</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">About</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
}

