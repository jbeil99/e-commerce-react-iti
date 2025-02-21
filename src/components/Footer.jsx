import logo from '../assets/icon/logo.png';
import socials_1 from '../assets/icon/Link 1.png';
import socials_2 from '../assets/icon/Link 2.png';
import socials_3 from '../assets/icon/Link 3.png';
import socials_4 from '../assets/icon/Link 4.png';

export default function Footer() {
    return (
        <footer className="footer py-4 mb-0">
            <div className="container">
                <div className="row">

                    <div className="col-lg-3 col-md-6">
                        <div>
                            <img className='me-2' src={logo} alt="FoodTrove Logo" />
                            <p className='d-inline footer-logo'>Clicon</p>
                        </div>
                        <p>FoodTrove is the biggest market of grocery products.</p>
                        <p><i className="fas fa-map-marker-alt text-danger"></i> 51 Green St, Huntington, Ontario, NY
                        </p>
                        <p><i className="fas fa-envelope text-danger"></i> example@email.com</p>
                        <p><i className="fas fa-phone text-danger"></i> +91 123 456 7890</p>
                    </div>

                    <div className="col-lg-2 col-md-6 mt-3">
                        <h5 className="fw-bold">Top Category</h5>
                        <ul className="list-unstyled company-list">
                            <li><a href="#">Computer & Laptop</a></li>
                            <li><a href="#">SmartPhone</a></li>
                            <li><a href="#">Headphone</a></li>
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">Camera & Photo</a></li>
                            <li><a href="#">TV & Homes</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 mt-3">
                        <h5 className="fw-bold">Quick links</h5>
                        <ul className="list-unstyled category-list">
                            <li><a href="#">Shop Product</a></li>
                            <li><a href="#">Shoping Cart</a></li>
                            <li><a href="#">Wishlist</a></li>
                            <li><a href="#">Compare</a></li>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Customer Help</a></li>

                        </ul>
                    </div>

                    <div className="col-lg-5 col-md-6 mt-3 ">
                        <h5 className="fw-bold mb-3">Subscribe Our Newsletter</h5>
                        <div className="d-flex mb-5 searchbar">
                            <input type="text" className="form-control" placeholder="Search here..." />
                            <button className="btn btn-dark"><i className="fas fa-paper-plane"></i></button>
                        </div>

                        <div className="d-flex social-icons ">
                            <img src={socials_1} alt="" />
                            {/* <img src="/images/icon/Link 2.png" alt="" style="width: 40px; height: 40px;"> */}

                            <img src={socials_2} alt="" />
                            <img src={socials_3} alt="" />
                            <img src={socials_4} alt="" />

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}