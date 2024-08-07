import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ReactContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [getUser, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("jwtToken" || ""));
  const [getProductsData, setProductsData] = useState([]);
  const url = "https://ecommerce-vamsi.onrender.com";

  console.log(token)

  const productDetails = async () => {
    await axios.get(`${url}/products`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response)
        setProductsData(response.data.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = async () => {
    if(token){
    await axios.get(`${url}/auth/v1/user`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then((response) => {
        setUser(response.data.data.user)
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    if(token){
      getUserData();
      productDetails();
    }
    
  }, [token]);

  return (
    <ReactContext.Provider value={{ getUser, setUser, url, token, getProductsData, productDetails, setToken }}>
      {children}
    </ReactContext.Provider>
  );
};
