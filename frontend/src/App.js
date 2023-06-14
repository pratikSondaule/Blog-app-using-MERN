import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";
import Blogs from './pages/Blogs'
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/useReducer';
import UserBlogs from './pages/UserBlogs';
import AddBlog from './pages/AddBlog';
import BlogDetails from './pages/BlogDetails';
import Home from './pages/Home';


export const UserContext = createContext()

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;