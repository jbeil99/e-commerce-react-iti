import { Link } from "react-router"
import CartCard from "../components/CartCard"

export default function Cart() {
    return (
        <section className="h-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100 card">
                    <div className="card-body p-4 row">
                        <div className="col-lg-7">
                            <h5 className="mb-3"><Link to={'/shop'} className="text-body"><i
                                className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <p className="mb-1">Shopping cart</p>
                                    <p className="mb-0">You have 4 items in your cart</p>
                                </div>

                            </div>

                            <CartCard />

                        </div>
                        <div className="col-lg-5">
                            <div className="card bg-primary text-white rounded-3">
                                <div className="card-body">
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Subtotal</p>
                                        <p className="mb-2">$4798.00</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Shipping</p>
                                        <p className="mb-2">$20.00</p>
                                    </div>

                                    <div className="d-flex justify-content-between mb-4">
                                        <p className="mb-2">Total(Incl. taxes)</p>
                                        <p className="mb-2">$4818.00</p>
                                    </div>

                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary  btn-lg">
                                        Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 