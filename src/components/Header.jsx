import logo from '../assets/logo.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router'

export default function Header() {
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary mb-5">
                <div className="container-fluid  justify-content-lg-center  justify-content-between">
                    <Link to='/'><Navbar.Brand ><img src={logo} alt="" /></Navbar.Brand></Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-center'>
                        <Nav className="custom-nav-link">

                            <NavLink to="/" className={({ isActive }) => isActive ? "active-green nav-link " : "nav-link category-nav"}>Home</NavLink>
                            <NavLink to="/shop" className={({ isActive }) => isActive ? " active-green nav-link " : "nav-link category-nav"}>Shop</NavLink>

                        </Nav>
                    </Navbar.Collapse>
                    <p className="nav ml-auto align-items-center d-none d-lg-block"><i className="fa-solid fa-phone"></i> +123
                        (456)
                        (7890) </p>

                </div>
            </Navbar>
        </header>
    )
}