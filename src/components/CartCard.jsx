import { useEffect, useState } from "react"
import { getProductById } from "../api/product"
import Swal from 'sweetalert2'
import { deleteCartProductAction } from "../store/cartSlice";
import { useDispatch } from 'react-redux';
import { calcProductTotalPriceAfterDiscount } from "../js/helpers/calcPrices";

export default function CartCard(props) {
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getprductData = async () => {
            const response = await getProductById(props.productID);
            setProduct(response.data);
        }
        getprductData();
    }, []);

    // TODO : Update state after delete
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
                console.log(e.target)
                dispatch(deleteCartProductAction({ cartID: e.target.dataset.cart, productID: e.target.dataset.id }));
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted",
                    icon: "success"
                });
            }
        });
    }


    return (
        <div className="card mb-3 cart-card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div>
                            <img
                                src={product?.image}
                                className="img-fluid rounded-3" alt="Shopping item" />
                        </div>
                        <div className="ms-3">
                            <h5>{product?.name}</h5>
                            <p className="small mb-0">{product?.description.slice(0, 25)}..</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div >
                            <h5 className="fw-normal mb-0 me-3 border py-2 px-4">{props.quantity}</h5>
                        </div>
                        <div >
                            <h5 className="mb-0 me-3">{props?.quantity} x ${calcProductTotalPriceAfterDiscount(product)}</h5>
                        </div>
                        <button href="#!" className="trash btn" data-id={props.productID} data-cart={props.cartID} onClick={handleDelete}>remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}