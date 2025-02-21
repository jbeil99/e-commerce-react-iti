import logo from '../assets/icon/logo.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../store/userSlice';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../store/userSlice';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.userSlice);
    const { cart } = useSelector(store => store.cartSlice);

    const currentUser = user ? user : JSON.parse(sessionStorage.getItem('user'))
    const isLoggedIn = Boolean(currentUser);
    const isAdmin = isLoggedIn && currentUser.role == 'admin' ? true : false;

    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);
    const handLogout = () => {
        sessionStorage.removeItem('user');
        const oldUser = user;
        dispatch(removeUser());
        navigate('/login')
        Swal.fire({
            title: `bye! ${oldUser.firstName} ${oldUser.lastName}`,
            icon: "success"
        });
    }
    return (
        <header>
            <Navbar expand="lg" className="mb-5">
                <div className="container-fluid  justify-content-lg-center  justify-content-between">
                    <Link to='/' className='text-decoration-none'><Navbar.Brand  ><img src={logo} alt="" />CLICON</Navbar.Brand></Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-center'>
                        <Nav className="custom-nav-link">

                            <NavLink to="/" className={({ isActive }) => isActive ? "active-green nav-link category-nav" : "nav-link category-nav"}>Home</NavLink>
                            <NavLink to="/shop" className={({ isActive }) => isActive ? " active-green nav-link category-nav" : "nav-link category-nav"}>Shop</NavLink>
                            {isAdmin ? <NavLink to="/dashboard" className={({ isActive }) => isActive ? " active-green nav-link category-nav" : "nav-link category-nav"}>Dashboard</NavLink> : ''}
                        </Nav>
                    </Navbar.Collapse>
                    <ul className="nav justify-content-end gap-3 p-2">
                        {
                            !isLoggedIn ? <>
                                <li className="nav-item">
                                    <i className="fa-regular fa-user me-2"></i>
                                    <NavLink to="/login" className={({ isActive }) => isActive ? "active-green category-nav" : "category-nav"}>Login</NavLink>
                                </li>
                                <li className="nav-item pointer">
                                    <i className="fa-solid fa-arrow-right-to-bracket me-2"></i>
                                    <NavLink to="/register" className={({ isActive }) => isActive ? "active-green  category-nav" : " category-nav"}>Register</NavLink>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <i className="fa-regular fa-user me-2"></i>
                                    <p className='category-nav d-inline'>Hello, {user?.firstName}</p>
                                </li>
                                <li className="nav-item pointer">
                                    <i className="fa-solid fa-arrow-right-to-bracket me-2"></i>
                                    <p className='category-nav d-inline' onClick={handLogout}>Log out</p>
                                </li>
                            </>
                        }
                        <li className="nav-item">
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            {cart?.items.length > 0 ? <span className='cart-items'>{cart?.items.length}</span> : ''}
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "active-green  category-nav" : " category-nav"}>Cart</NavLink>
                        </li>
                    </ul>
                </div>
            </Navbar>
        </header>
    )
}