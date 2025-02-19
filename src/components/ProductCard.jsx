export default function ProductCard(props) {
    return (
        <div className={`card hot product-card__rounded col ${props.responsive}`}>
            <span className="product-badge">Hot</span>
            <img src='/src/assets/products/lemon.png' className="card-img-top"
                alt="Fresh organic villa farm lemon 500gm pack" />
            <div className="card-body">
                <p className="text-muted">Snack</p>
                <h5 className="card-title">Fresh organic villa farm lemon 500gm pack</h5>
                <div className="ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                    <span className="text-muted ml-2">(4.0)</span>
                </div>
                <p className="card-text text-danger mt-2"><span className="text-muted">By</span> NestFood</p>
                <div className="row">
                    <p className="text-success font-weight-bold h5 col-auto">$28.85 <span
                        className="text-muted h6 text-decoration-line-through ml-2 ">$32.8</span></p>
                    <a href="#" className="btn btn-primary rounded ms-auto col-auto">
                        <i className="fa-solid fa-cart-shopping"></i>add</a>
                </div>
            </div>
        </div>
    )
}