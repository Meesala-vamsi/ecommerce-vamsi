
import { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Products from "../Products/Products";
import "./Home.css";
import { ReactContext } from "../../ReactContext/Context";
import axios from "axios";

const Home = () => {

  const {url,setUser,getUser} = useContext(ReactContext)

  // useEffect(()=>{
  //   const getData = async()=>{
  //     await axios.get(`${url}/auth/v1/user`,{withCredentials:true})
  //     .then((res)=>{
  //       console.log(res)
  //       setUser(res.data)
  //     })
  //   }
  //   getData()
  // })

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="banner-container" id="home">
          <div className="banner-content">
            {console.log(getUser)}
            <h2>Shop your favourite item here</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              sit nesciunt exercitationem, illo explicabo expedita eos eligendi
              repellendus aspernatur porro nam neque ipsam, nemo quod
              distinctio, fuga laudantium maiores id.
            </p>
            <button>View Menu</button>
          </div>
        </div>
        <Products/>
      </div>
    </>
  );
};

export default Home;
