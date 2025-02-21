import { Link, useParams, useNavigate } from 'react-router'
import { getProductById } from '../api/product';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { deleteProductAction } from '../store/productSlice';
import { useSelector } from 'react-redux';
import { getCartAction, addProductToCartAction } from '../store/cartSlice';
import { getCurrentUser } from '../store/userSlice';
import { addProductToCartSessionAction } from '../store/cartSlice';
export default function ProductDetails() {
    const { user } = useSelector(store => store.userSlice);
    let { cart, isLoading, errors } = useSelector(store => store.cartSlice)

    const isAuthenticated = Boolean(user);
    const isAdmin = isAuthenticated && user.role == 'admin' ? true : false;

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductById(id)
                setProduct(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
        if (user) {
            dispatch(getCartAction(user.id));
        } else {
            dispatch(getCartAction());
        }

    }, [])

    const handleDelete = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProductAction(e.target.dataset.id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted",
                    icon: "success"
                });
                navigate('/shop')
            }
        });
    }

    const handelAddToCart = (e) => {
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
        <div className="col-md-9 mx-auto my-5">
            <Link className="btn btn-info mb-2" to={'/shop'}>Back to shop </Link>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 border">
                    <img src={product.image} className="product-image d-block mx-auto" alt="Product" />
                </div>
                <div className=" col-sm-12 col-md-12 col-lg-6 col-xl-6 ps-5">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="ratings mb-3">
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star rating-color"></i>
                        <i className="fa fa-star"></i>
                        <span className="text-muted ml-2">({product.rating})</span>
                    </div>
                    <ul className="list-unstyled">
                        <li ><strong>Category:</strong> {product.category?.name}</li>
                        <li ><strong>Seller:</strong> {product.seller?.name}</li>
                        <li ><strong>Quantity:</strong> {product.quantity}</li>
                    </ul>
                    <div className="row">
                        <p className="text-danger font-weight-bold h5 col-auto"><strong
                        >${product.customerPrice}</strong></p>
                    </div>
                    <div className="action-buttons">
                        <div>

                            {isAdmin ? <>
                                <button className="btn btn-danger me-2" onClick={handleDelete} data-id={product.id}>Delete</button>
                                <Link className="btn btn-warning me-2" to={'edit'}>Edit</Link>

                            </> : ''}
                            <button className="btn btn-primary me-2" onClick={handelAddToCart} data-id={product.id}>add To cart</button>

                        </div>
                        <div className="icon-buttons">
                            <img src="/images/icon/Heart.png" alt="" />
                            <img src="/images/icon/Eye.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}