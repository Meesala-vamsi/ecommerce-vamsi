import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ReactContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [getUser, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("connect.sid" || ""));
  const [getProductsData, setProductsData] = useState([]);
  const url = "https://ecommerce-vamsi.onrender.com";
  const navigate = useNavigate();

  console.log(token)

  const productDetails = async () => {
    await axios.get(`${url}/products`, { withCredentials: true })
      .then((response) => {
        setProductsData(response.data.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = async () => {
    if(token){
    await axios.get(`${url}/auth/v1/user`, { withCredentials: true })
      .then((response) => {
        setUser(response.data.data.user)
        console.log(response.data.data.user)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {

    getUserData();
    productDetails();
    
  }, [token]);

  return (
    <ReactContext.Provider value={{ getUser, setUser, url, token, getProductsData, productDetails, setToken }}>
      {children}
    </ReactContext.Provider>
  );
};
