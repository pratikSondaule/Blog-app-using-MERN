import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const BlogCard = ({
    title,
    description,
    image,
    name,
    id,
    isUser
}) => {
    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/blog-details/${id}`)
    }

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`https://blogapp-px2x.onrender.com/api/v1/blog/delete-blog/${id}`)
            if (data) {
                alert("Blog Deleted");
                navigate("/blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="card" style={{ width: "80vw" }}>
                {isUser && (
                    <div className='icons'>
                        <div className='edit'>
                            <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
                        </div>
                        <div className='delete'>
                            <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                        </div>
                    </div>
                )}
                <h2 className="card-title text-center m-5">{title}</h2>
                <img src={image} className="card-img-top" alt="Blog Image" />
                <div className="card-body">
                    <p className='card-text text-center fw-bold'>{name}</p>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
