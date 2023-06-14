import { useContext } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"

const Header = () => {

    let { state, dispatch } = useContext(UserContext)
    state = state || localStorage.getItem("userID")
    const navigate = useNavigate()

    const handleLogout = () => {
        try {
            dispatch({ type: "USER", payload: false })
            localStorage.removeItem("userID")
            navigate("/login")
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="position-sticky top-0 bottom-0 z-1">
            <nav className="navbar bg-light navbar-expand-lg bg-body-tertiary" data-bs-theme="light">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2" to="/">Blog App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {state ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link fs-5" to="/blogs">Blogs</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link fs-5" to="/my-blogs">My Blogs</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link fs-5" to="/add-blog">Add Blog</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-primary fs-5" onClick={handleLogout}>Logout</button>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link fs-5" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link fs-5" to="/register">Register</NavLink>
                                    </li>
                                </>}
                        </ul>

                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Header
