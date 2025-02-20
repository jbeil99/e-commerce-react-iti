export default function CartCard() {
    return (
        <div className="card mb-3 cart-card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                className="img-fluid rounded-3" alt="Shopping item" />
                        </div>
                        <div className="ms-3">
                            <h5>Iphone 11 pro</h5>
                            <p className="small mb-0">256GB, Navy Blue</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div >
                            <h5 className="fw-normal mb-0">2</h5>
                        </div>
                        <div >
                            <h5 className="mb-0">$900</h5>
                        </div>
                        <a href="#!" className="trash"><i className="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}