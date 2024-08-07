// Header.js
import { useContext, useState } from "react";
import Cookies from "js-cookie"
// import Search from "../Search/Search";
import "./Header.css"
import { IoMdMenu } from "react-icons/io";
import { ReactContext } from "../../ReactContext/Context";
import { useNavigate } from "react-router-dom";
import AddProductPopup from "../AddProductPopup/AddProductPopup";

const Header = () => {
  const {isSidebarVisible, setSidebarVisible} = useContext(ReactContext)
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate=useNavigate()

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const onClickLogout=()=>{
   const token = Cookies.remove("jwtToken")
   if(token===undefined){
    navigate("/login")
   }
  }



  const openAddProductPopup = () => {
    setPopupOpen(true);
  };

  const closeAddProductPopup = () => {
    setPopupOpen(false);
  };

  const onClickAddProduct=()=>{
    return <AddProductPopup isOpen={isPopupOpen} onClose={closeAddProductPopup} />
  }

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <IoMdMenu className="menu-icon" onClick={toggleSidebar}/>
          <h1>Ecommerce App</h1>
        </div>
        {/* <Search /> */}
        <button onClick={openAddProductPopup}>Add Product +</button>
        <div className="profile-container">
          <button onClick={onClickLogout}>Logout</button>
          <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className="profile-image" />
        </div>
      </div>
      {isPopupOpen && <AddProductPopup isOpen={isPopupOpen} onClose={closeAddProductPopup} />}
    </>
  );
}

export default Header;
