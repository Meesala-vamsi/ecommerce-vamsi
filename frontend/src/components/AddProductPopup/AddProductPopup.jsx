// AddProductPopup.js
import { useContext, useState } from "react";
import axios from "axios";
import "./AddProductPopup.css"; 
import { ReactContext } from "../../ReactContext/Context";
import { toast } from "react-toastify";

const AddProductPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const {productDetails,getUser,token} = useContext(ReactContext)
  const [productdetails,setProductDetails] = useState({
    name:"",
    description:"",
    price:0,
    stock:0,
    image:""
  })

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setProductDetails({
      ...productdetails,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

      await axios.post("http://localhost:3000/products", formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((res)=>{
        toast.success("Product Added Successfully")
        productDetails()
      })
      .catch((err)=>{
        toast.error("You dont have access to perform this action.")
      })
      onClose();  
  };

  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          </div>
          <div className="input-container">
            <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          </div>
          <div className="input-container">
            <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          </div>
          <div className="input-container">
            <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          </div>
          <button type="submit">Add Product</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddProductPopup;
