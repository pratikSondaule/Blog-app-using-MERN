import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"

const Login = () => {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const login = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/user/login", {
        email: user.email,
        password: user.password
      })

      if (data) {
        localStorage.setItem("userID", data?.user?._id);
        dispatch({ type: "USER", payload: true })
        alert("Login successfully");
        navigate("/blogs")
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  }
  return (
    <div className="box">
      <div className="text-center mb-3">
        <h1>Login</h1>
      </div>
      <form method="POST">
        <div className="mb-3">
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} placeholder="E-mail" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
        </div>
        <button className="btn btn-primary mb-3 form-control" onClick={login}>Login</button>
      </form>
      <p className='text-center'>OR</p>
      <p className='text-center'>Not a user? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login
