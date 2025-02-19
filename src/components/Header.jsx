import logo from '../assets/icon/logo.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router'

export default function Header() {
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

                        </Nav>
                    </Navbar.Collapse>
                    <ul className="nav justify-content-end gap-3 p-2">
                        <li className="nav-item">
                            <i className="fa-regular fa-user me-2"></i>
                            {/* <a href="pages/login.html">Account</a> */}
                            <Link to="/login" className={({ isActive }) => isActive ? "active-green nav-link category-nav" : "nav-link category-nav"}>Account</Link>
                        </li>
                        <li className="nav-item pointer">
                            <i className="fa-regular fa-heart me-2"></i>
                            <Link to="/wishlist" className={({ isActive }) => isActive ? "active-green nav-link category-nav" : "nav-link category-nav"}>Wishlist</Link>
                        </li>
                        <li className="nav-item">
                            <i class="fa-solid fa-cart-shopping me-2"></i>
                            <Link to="/cart" className={({ isActive }) => isActive ? "active-green nav-link category-nav" : "nav-link category-nav"}>Cart</Link>
                        </li>
                    </ul>


                </div>
            </Navbar>
        </header>
    )
}