import { useNavigate } from 'react-router'
import { addProductToCartAction, addProductToCartSessionAction } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { calcProductTotalPriceAfterDiscount } from '../js/helpers/calcPrices';
import { useEffect } from 'react';
import { getCartAction } from '../store/cartSlice';
import Swal from 'sweetalert2';
import { getCurrentUser } from '../store/userSlice';

export default function ProductCard({ product, badge }) {
    const { cart } = useSelector(store => store.cartSlice)
    const { user } = useSelector(store => store.userSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = user ? user : JSON.parse(sessionStorage.getItem('user'));



    useEffect(() => {
        dispatch(getCurrentUser())
        if (currentUser) {
            dispatch(getCartAction(currentUser.id))
        } else {
            const sessionCart = JSON.parse(sessionStorage.getItem('cart'));
            dispatch(getCartAction())
            if (!sessionCart) {
                sessionStorage.setItem('cart', JSON.stringify({ items: [] }))
            }
        }
    }, [])

    const handleClick = (e) => {
        e.stopPropagation();
        navigate(`/products/${product.id}`)
    }


    const handleCart = (e) => {
        e.stopPropagation();
        const oldProduct = cart?.items.find(item => item.productID === product.id) ?? { quantity: 0 };
        if (oldProduct.quantity < product.quantity) {
            if (user) {
                dispatch(addProductToCartAction({ cartID: cart.id, productID: product.id, quantity: 1 }));
            } else {
                dispatch(addProductToCartSessionAction(product.id))
            }
            Swal.fire({
                title: "Product added to cart!",
                icon: "success"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Cant add more of this product to cart",
                footer: '<a href="/cart">Check your cart to checkout</a>'
            });
        }
    }
    return (
        <div className={`card ${badge.show ? badge.name : ''} product-card__rounded col ${product.responsive}`}>
            {badge.show ? <span className="product-badge">{badge.name}</span> : ''}
            <div className='product-img-c'>
                <img src={product.image} className="card-img-top"
                    alt="Fresh organic villa farm lemon 500gm pack" onClick={handleClick} />
            </div>
            <div className="card-body">
                <div onClick={handleClick}>
                    <p className="text-muted" >{product.category?.name}</p>
                    <h5 className="card-title">{product.name}</h5>
                    <div className="ratings">
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star"></i>
                        <span className="text-muted ml-2">(4.0)</span>
                    </div>
                </div>
                <p className="card-text text-danger mt-2"><span className="text-muted">By</span> {product.seller?.name}</p>
                <div className="row">
                    {product.sale > 0
                        ? <p className="text-success font-weight-bold h5 col-auto">${calcProductTotalPriceAfterDiscount(product)} <span
                            className="text-muted h6 text-decoration-line-through ml-2 ">${product.customerPrice}</span></p>
                        : <p className="text-success font-weight-bold h5 col-auto">${calcProductTotalPriceAfterDiscount(product)}</p>
                    }
                </div>
                <div>
                    {product.quantity > 0
                        ? <a href="#" className="btn btn-primary rounded ms-auto col-12" onClick={handleCart}>
                            <i className="fa-solid fa-cart-shopping" ></i>add</a>
                        : <button href="#" className="btn btn-disabled  rounded ms-auto col-12" onClick={handleCart} disabled>
                            <i className="fa-solid fa-cart-shopping" ></i>Out of Stock</button>
                    }
                </div>
            </div>
        </div>
    )
}