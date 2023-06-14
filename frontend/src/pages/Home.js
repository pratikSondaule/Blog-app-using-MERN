import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {


    return (
        <div className='box'>
            <div className='text-center'>
                <h1>Welcome</h1>
                <p className='m-0'>This is Blog App made with MERN stack.</p>
                <p>Please Login or Register to create your own blog</p>
            </div>
            <div className='d-flex justify-content-center align-center m-auto'>
                <Link className='btn btn-primary m-1' to="/login">Login</Link>
                <Link className='btn btn-primary m-1' to="/register">Register</Link>
            </div>

        </div>
    )
}

export default Home
