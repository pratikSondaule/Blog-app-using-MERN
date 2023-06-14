import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const register = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:8080/api/v1/user/register", {
                name: user.name,
                email: user.email,
                password: user.password
            })

            if (data) {
                alert("Registered successfully");
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="box">
            <div className="text-center mb-3">
                <h1>Register</h1>
            </div>
            <form method="POST">
                <div className="mb-3">
                    <input type="text" className="form-control" id="name" placeholder="Name" name='name' value={user.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" id="email" placeholder="E-mail" name='email' value={user.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={user.password} onChange={handleChange} required />
                </div>
                <button type='submit' className="btn btn-primary mb-3 form-control" onClick={register}>Register</button>
            </form>
            <p className='text-center'>OR</p>
            <p className='text-center'>Already a user? <Link to="/login">Login</Link></p>
        </div>

    )
}

export default Register
