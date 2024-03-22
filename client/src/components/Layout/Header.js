import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from "antd";

const Header = () => {
    const [cart] = useCart();
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const handleOnLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth');
        toast.success("LogOut Successfully");
    }
    return (
        <><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand text-light">
                ⌚Watchify
            </Link>
            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link text-light">Home</NavLink>
                    </li>

                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle text-light" to={'/categories'} role='button' data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </NavLink>
                        <ul className="dropdown-menu">
                            {
                                categories?.map(c => (
                                    <div kay={c.name + c.slug}>
                                        <li><Link className="dropdown-item" to={`/category/${c.slug}`} >{c.name}</Link></li>
                                    </div>
                                ))
                            }
                        </ul>
                    </li>
                    {
                        !auth.user ? (<>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link text-light">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link text-light">Login</NavLink>
                            </li>
                        </>) : (<>

                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle text-light" to={'/admin'} data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth?.user?.name}
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={handleOnLogOut} to="/login" className="dropdown-item" style={{ color: "black" }} >LogOut</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </>
                        )
                    }
                    <li className="nav-item">
                        <NavLink to="/cart" className="nav-link">
                            <Badge size="small" className='text-light' count={cart?.length} showZero offset={[10, -5]}>
                                Cart
                            </Badge>
                        </NavLink>
                    </li>
                </ul>
                <SearchInput />
            </div>
        </nav>
        </>
    )
}

export default Header