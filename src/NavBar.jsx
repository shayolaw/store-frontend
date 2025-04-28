import React, { useContext, useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, redirect, useNavigate } from "react-router";
import axios from "../api/axios";
import { Link } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { selectCount, totalAmount,totalTax,clear } from "./cartSlice";
import { persistor } from "./store";
import { toast } from 'react-toastify';


export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {auth,setAuth} = useContext(AuthContext);
  const [message,setMessage] = useState({});
  const [messageState,setMessageState] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cartCount = useSelector(selectCount);
  const cartTotal = useSelector(totalAmount)
  const dispatch = useDispatch()
  const cartTax = useSelector(totalTax)
  const cart = useSelector((state)=>state.cart)

   function logout(){
    alert("here")
    setAuth({})
    localStorage.clear();
    persistor.purge()
   
    window.location.href = "/login";
  }
  function Checkout(){
    let formData = {
      "user_id": auth.id,
      "sub_total":cartTotal,
      "total_tax":cartTax,
      "total_price": (Number(cartTotal) + Number(cartTax)).toFixed(2),
      "products": [...cart]
    }
    console.log(formData);
    const response = axios.post('/orders',formData).then(response=>{
      //Write a success message
      
      dispatch(clear());
      persistor.purge();
      toast.success("Order Created")
      console.log("Order Created", response.data);
      //clear the cart store

    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <nav className="bg-indigo-700  shadow-md ">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">ShopMate</div>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex space-x-6 text-white">
            <a href="#" className="hover:text-red-500 text-white">Home</a>
            <Link to="/shop" className="hover:text-blue-500 text-white">Shop</Link>
            <Link to="/products" className="hover:text-blue-500 text-white">Products</Link>
            <a href="" className="hover:text-blue-500">Contact</a>
        </div>


          {/* Search Bar */}
          <div className="hidden md:flex  max-w-md">
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
            <div data-testid="cart" className="relative cursor-pointer" >
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative" >
              <ShoppingCart data-testid="showDropdown" onClick={() => setDropdownOpen(!dropdownOpen)} className="h-6 w-6 text-white hover:text-blue-500" />
              <span data-testid="cartCount" className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
              </button>{/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto z-10">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              {/* Cart items */}
              <div className="space-y-4" data-testid="cartitems">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-gray-200 rounded-md"></div>
                      <div>
                        <p className="font-medium"> {item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price}</p>
                      <button className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="flex justify-between text-sm mt-4">
                <span>Subtotal</span>
                <span>{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Tax</span>
                <span>{cartTax}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>${(Number(cartTotal) + Number(cartTax)).toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button data-testid="CheckoutButton" onClick={Checkout} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Checkout
              </button>
            </div>
          </div> )}
            </div>
           

            {/* User Dropdown */}
            <div className="cursor-pointer hover:text-blue-500">
            {
                auth.email=== undefined ?
                <span>
                    <a href="/login">Login</a>
                </span> :
                 <span>
                <p className="text-white">Welcome {auth.name}</p>
                 <a className="text-white" onClick={logout}>Logout</a>
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

