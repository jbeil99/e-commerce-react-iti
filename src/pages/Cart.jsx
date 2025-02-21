import { Link } from "react-router"
import CartCard from "../components/CartCard"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction } from '../store/cartSlice'
import CartTotals from "../components/CartTotals";

export default function Cart() {
    let { cart, isLoading, errors } = useSelector(store => store.cartSlice)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartAction('dc10'));
    }, [])


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
                                    <p className="mb-0">You have {cart.items?.length} items in your cart</p>
                                </div>

                            </div>

                            {!isLoading ? cart.items.map((item) => {
                                return <CartCard {...item} key={item.productID} cartID={cart.id} />
                            }) : 'Loading'}
                        </div>
                        <CartTotals {...cart}/>
                    </div>
                </div>
            </div>
        </section>
    )
} 