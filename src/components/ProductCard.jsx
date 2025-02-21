import { useNavigate} from 'react-router'
import { addProductToCartAction } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { calcProductTotalPriceAfterDiscount } from '../js/helpers/calcPrices';

export default function ProductCard(product) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.stopPropagation();
        navigate(`/products/${product.id}`)

    }
   
    const handleCart = (e) => {
        e.stopPropagation();
        dispatch(addProductToCartAction({cartID: 'dc10', productID: product.id, quantity: 1}))
    }
    return (
        <div className={`card hot product-card__rounded col ${product.responsive}`}>
            <span className="product-badge">Hot</span>
            <img src={product.image} className="card-img-top"
                alt="Fresh organic villa farm lemon 500gm pack" onClick={handleClick} />
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
                    <p className="text-success font-weight-bold h5 col-auto">${calcProductTotalPriceAfterDiscount(product)} <span
                        className="text-muted h6 text-decoration-line-through ml-2 ">${product.customerPrice}</span></p>
                    <a href="#" className="btn btn-primary rounded ms-auto col-auto" onClick={handleCart}>
                        <i className="fa-solid fa-cart-shopping" ></i>add</a>
                </div>
            </div>
        </div>
    )
}