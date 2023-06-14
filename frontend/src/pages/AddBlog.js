import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })

    const navigate = useNavigate()
    const id = localStorage.getItem("userID")

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const addBlog = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("https://blogapp-p4w8.onrender.com/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })

            if (data) {
                alert("Blog added successfully");
                navigate("/my-blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='box'>
            <div className="text-center mb-3">
                <h1>Add your Blog</h1>
            </div>
            <form method="POST">
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" name='title' value={inputs.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" placeholder="Description" name='description' value={inputs.description} rows="4" cols="50" onChange={handleChange} required ></textarea>
                </div>
                <div className="mb-3">
                    <label for="image" className="form-label">Image URL</label>
                    <input type="text" className="form-control" id="image" placeholder="Add Image URL" name='image' value={inputs.image} onChange={handleChange} required />
                </div>
                <button type='submit' className="btn btn-primary mb-3 form-control" onClick={addBlog} >Add Blog</button>
            </form>
        </div>
    )
}

export default AddBlog
