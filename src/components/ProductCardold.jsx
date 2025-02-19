import { useState } from "react"
import { Link } from "react-router";
export default function ProductCard(props) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    }
    return (
        <div className="card  product-card__rounded col">
            <Link className="text-decoration-none" to={`/products/${props.id}`}>
                <img src={props.img} className="card-img-top"
                    alt="Fresh organic villa farm lemon 500gm pack" />
                <div className="card-body">
                    {props.quantity > 0 ? <>
                        <p className="text-muted">{props.category}</p>
                        <h5 className="card-title">{props.name}</h5>
                        <div className="ratings">

                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star rating-color"></i>
                            <i className="fa fa-star"></i>

                            <span className="text-muted ml-2">({props.rating})</span>
                        </div>
                        <p className="card-text text-danger mt-2"><span className="text-muted">By</span> {props.seller}</p>
                        <p className="card-text text-success mt-2 fw-bold"><span className="text-muted">Quantity</span> {props.quantity}</p></> : <p className="text-danger">Out Of Stock</p>}
                    <p className="card-text text-success mt-2 fw-bold">
                        <span className="text-muted">Description:</span>
                        {
                            show ? <>{props.description}
                                <button className="btn" onClick={toggleShow}>Show less</button></> :
                                <>{props.description.slice(0, 20)}
                                    <button className="btn" onClick={toggleShow}>Show more</button></>
                        }
                    </p>

                    <div className="row">
                        <p className="text-success font-weight-bold h5 col-12">Price: ${props.price} </p>
                        <button href="#" className={`btn ${props.quantity > 1 ? 'btn-success' : (props.quantity === 1 ? 'btn-warning' : 'btn-danger')} rounded ms-auto col-12`}> <i
                            className="fa-solid fa-cart-shopping"></i>
                            {props.quantity >= 1 ? 'Buy now' : 'Sold Out'}</button>
                    </div>
                </div>
            </Link>
        </div >
    )
}