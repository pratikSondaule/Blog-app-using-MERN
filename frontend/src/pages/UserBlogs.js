import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userID")
            const { data } = await axios.get(`https://backend-3b0e.onrender.com/api/v1/blog/user-blog/${id}`)

            if (data) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserBlogs()
    }, [])
    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => {
                    return (
                        <BlogCard
                            key={blog?._id}
                            id={blog?._id}
                            isUser={true}
                            title={blog?.title}
                            description={blog?.description}
                            image={blog?.image}
                            name={blog?.user?.name}
                        />
                    )
                })
            ) : (
                <h1 className='text-center m-5'>You haven't created a Blog</h1>
            )
            }
        </div>
    )
}

export default UserBlogs
