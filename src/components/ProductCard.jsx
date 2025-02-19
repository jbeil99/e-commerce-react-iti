export default function ProductCard(product) {
    return (
        <div className={`card hot product-card__rounded col ${product.responsive}`}>
            <span className="product-badge">Hot</span>
            <img src={product.image} className="card-img-top"
                alt="Fresh organic villa farm lemon 500gm pack" />
            <div className="card-body">
                <p className="text-muted">{product.category?.name}</p>
                <h5 className="card-title">{product.name}</h5>
                <div className="ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                    <span className="text-muted ml-2">(4.0)</span>
                </div>
                <p className="card-text text-danger mt-2"><span className="text-muted">By</span> {product.seller?.name}</p>
                <div className="row">
                    <p className="text-success font-weight-bold h5 col-auto">${product.price} <span
                        className="text-muted h6 text-decoration-line-through ml-2 ">$32.8</span></p>
                    <a href="#" className="btn btn-primary rounded ms-auto col-auto">
                        <i className="fa-solid fa-cart-shopping"></i>add</a>
                </div>
            </div>
        </div>
    )
}