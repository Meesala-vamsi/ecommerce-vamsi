import { useContext } from "react"
import { ReactContext } from "../../ReactContext/Context"
import { MdOutlineDeleteOutline } from "react-icons/md";
import Cookies from "js-cookie"
import "./Products.css"
import axios from "axios";
import { toast } from "react-toastify";

const Products = ()=>{
  const {getProductsData,url,getUser,setProductsData,a,productDetails,token} = useContext(ReactContext)
  console.log(getProductsData)
  console.log(Cookies.get("connect.sid"))
  console.log(getUser)

  const onClickDelete=async(id)=>{
    if(getUser.role==="admin"){
    await axios.delete(`${url}/products/${id}`,{withCredentials:true})
    .then((response)=>{
      console.log(response)
      if(response.status===200){
        console.log(response)
        productDetails()
        toast.success("Product deleted successfully");
      }
    })
  }else{
    toast.error("You dont have access to perform this Action")
  }
  }
  return(
    <div className="products-container">
      <ul className="products-list-container">
        {
          getProductsData.map((eachProduct)=>(
            <li>
              <div className='food-items-container'>
      <div className='food-item-image-container'>
        <img src={url+"/images/"+eachProduct.image} alt="" className='food-image' />
        
      </div>
      <div className='food-items-content'>
        <div className='food-items-ratings'>
          <h1>{eachProduct.name}</h1>
          <MdOutlineDeleteOutline style={{fontSize:"20px",cursor:"pointer"}} onClick={()=>onClickDelete(eachProduct._id)}/>
        </div>
        <p>{eachProduct.description}</p>
        <p className='price'>{eachProduct.price}</p>
      </div>
    </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Products