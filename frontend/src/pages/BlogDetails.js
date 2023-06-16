import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const BlogDetails = () => {
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({})


    const blogDetail = async () => {
        try {
            const { data } = await axios.get(`https://blogapp-px2x.onrender.com/api/v1/blog/get-blog/${id}`)

            if (data) {
                setBlog(data?.blog)
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        blogDetail()

    }, [id])

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const updateBlog = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`https://blogapp-px2x.onrender.com/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })

            if (data) {
                alert("Blog updated successfully");
                navigate("/my-blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='box'>
            <div className="text-center mb-3">
                <h1>Update your Blog</h1>
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
                <button type='submit' className="btn btn-primary mb-3 form-control" onClick={updateBlog} >Update Blog</button>
            </form>
        </div>
    )
}

export default BlogDetails
