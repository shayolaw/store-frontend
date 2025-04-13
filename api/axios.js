import axios from "axios";
import logout from "../src/NavBar"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";



const instance = axios.create({
    baseURL : "http://localhost:80/",
    headers: {
        "Content-Type": "application/json",
    },
})
instance.defaults.withCredentials = true;
instance.defaults.withXSRFToken = true
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // alert(error.response.status)
    if(error.response.status==401){
       
        localStorage.clear();
        window.location.href = "/login";
    }
    // return Promise.reject(error);
  })
export default instance