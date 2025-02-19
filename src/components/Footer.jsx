import logo from '../assets/footer/Logo.png';
import link_1 from '../assets/footer/1.png';
import link_2 from '../assets/footer/2.png';
import link_3 from '../assets/footer/3.png';
import link_4 from '../assets/footer/4.png';
import link_5 from '../assets/footer/5.png';
import socials_1 from '../assets/icon/Link 1.png';
import socials_2 from '../assets/icon/Link 2.png';
import socials_3 from '../assets/icon/Link 3.png';
import socials_4 from '../assets/icon/Link 4.png';

export default function Footer() {
    return (
        <footer className="footer py-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <img className="move-img" src={logo} alt="FoodTrove Logo" />
                        <p>FoodTrove is the biggest market of grocery products.</p>
                        <p><i className="fas fa-map-marker-alt text-danger"></i> 51 Green St, Huntington, Ontario, NY
                        </p>
                        <p><i className="fas fa-envelope text-danger"></i> example@email.com</p>
                        <p><i className="fas fa-phone text-danger"></i> +91 123 456 7890</p>
                    </div>

                    <div className="col-lg-2 col-md-6 mt-3">
                        <h5 className="fw-bold">Company</h5>
                        <ul className="list-unstyled company-list">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Delivery Information</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Support Center</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 mt-3">
                        <h5 className="fw-bold">Category</h5>
                        <ul className="list-unstyled category-list">
                            <li><a href="#">Dairy & Bakery</a></li>
                            <li><a href="#">Fruits & Vegetables</a></li>
                            <li><a href="#">Snack & Spice</a></li>
                            <li><a href="#">Juice & Drinks</a></li>
                            <li><a href="#">Chicken & Meat</a></li>
                            <li><a href="#">Fast Food</a></li>
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

                        <div className="d-flex mt-4 footer-images">
                            <img src={link_1} className="me-3" />
                            <img src={link_2} className="me-3" />
                            <img src={link_3} className="me-3" />
                            <img src={link_4} className="me-3" />
                            <img src={link_5} className="me-3" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}