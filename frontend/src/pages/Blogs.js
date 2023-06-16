import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("https://blogapp-o0qw.onrender.com/api/v1/blog/all-blogs")
      if (data) {
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllBlogs()
  }, [])

  return (
    <div>
      {blogs && blogs.map((blog) => {
        return (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem("userID") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            name={blog?.user?.name}
          />
        )
      })}
    </div>
  );
};

export default Blogs;
