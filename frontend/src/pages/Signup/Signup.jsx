import axios from "axios"
import "./Signup.css"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {ReactContext} from "../../ReactContext/Context"
import { toast } from "react-toastify"

const Signup = () => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const { url } = useContext(ReactContext)
  const navigate = useNavigate()

  const onChangeInput = (e) => {
    const { id, value } = e.target
    setDetails({
      ...details,
      [id]: value
    });
  }


  const onClickLogin = () => {
    navigate("/login")
  }

  const onSubmitDetails = async (e) => {
    e.preventDefault()

    await axios.post(`${url}/auth/v1/signup`, details)
      .then(response => {
        console.log(response)
        if (response.status === 200 || 201) {
          navigate("/login")
          toast.success("User Created Successfully.Please Login..")
        }
      }).catch(err => {
        console.log(err)
        toast.error("Something Went Wrong.Please try again.")
      })
    setDetails({
      email: "",
      password: "",
      username: "",
      role:""
    })
  }


  return (
    <div className="signup-container">
      <h1>SignUp</h1>
      <form action="" onSubmit={onSubmitDetails} className="form-container">
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={details.username} placeholder="Username" onChange={onChangeInput} />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={details.email} placeholder="Email" onChange={onChangeInput} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" value={details.password} onChange={onChangeInput} />
        </div>
        <div className="input-container">
          <label htmlFor="role">User Role</label>
          <input type="text" id="role" placeholder="Enter Your Role" value={details.role} onChange={onChangeInput} />
        </div>
        <div className="btn-container">
          <button type="submit">Submit</button>
          <div className="account-link-container">
            <p>Already have an account?</p>
            <p onClick={onClickLogin} className="account-link">Go to Login</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup