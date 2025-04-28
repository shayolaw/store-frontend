import { useState, useEffect } from "react";
import './Login.css'; // Importing the CSS file
// import axios from "axios";
import axios from "../api/axios"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, redirect, useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [message,setMessage] = useState("")
  const navigate = useNavigate()
  const {auth,setAuth} = useContext(AuthContext)
  const [password, setPassword] = useState("");
  // const user = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser != undefined) {
      const foundUser = JSON.parse(loggedInUser);
      setAuth(foundUser);
      navigate('/home')
    }
    setAuth({})
  }, []);

  const handleSubmit = () => {
   
    axios.get('/sanctum/csrf-cookie').then(response => {
   
        axios.post("/api/login", { email: email, password: password })
        .then((response) => {
         console.log("Sign in successful", response.data);
         // Store the authentication token for subsequent requests
        //  const token = response.data.token;
        //  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setAuth({
            "email":user.email,
            "name":user.name
        })
        navigate('/home')
        console.log(user)
        })
        .catch((error) => {
         setMessage("Invalid Username or Passworde")
         console.error("Sign in error", error);
        });
        // console.log(response)
    }).catch((error)=>{
        setMessage("Network Error")
    })
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login To Your Account</h2>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <span className="text-red-500 text-xs"> {message}</span>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required
            />
          </div>
          <button data-testid="loginbutton" onClick={handleSubmit} type="submit" className="login-btn" >Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
