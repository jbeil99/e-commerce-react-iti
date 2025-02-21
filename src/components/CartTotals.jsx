import { useEffect, useState } from "react"
import { calacPrices } from "../js/helpers/calcPrices"
import { addOrder } from "../api/order";

export default function CartTotals(props) {
    const [totals, setTotals] = useState({
        total: 0,
        subtotal: 0
    })

    useEffect(() => {
        console.log(props.items)
        const getPrices = async () => {
            const data = await calacPrices(props.items, 10);
            setTotals(data)
        }
        if (props.items) {
            getPrices()
        }
    }, [props]);

    const handleCheckout = (e) => {
        const order = {
            userID: "1", // TODO: GEt from current user
            totalPrice: totals.total, // total
            status: "placed",
            items: [],
            address: {
                "1": "asdas",
                "2": ""
            },
            phone: "01155991822",
            firstName: "clicon", // TODO: get from user
            lastName: "clicon",
            date: Date.now(),
            orderCanceld: true
        }
        addOrder({...order, items: props.items});
    }


    return (
        <div className="col-lg-5">
            <div className="card bg-primary text-white rounded-3">
                <div className="card-body">
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between">
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">${totals.subtotal}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="mb-2">Shipping</p>
                        <p className="mb-2">$10</p>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                        <p className="mb-2">Total(Incl. taxes)</p>
                        <p className="mb-2">${totals.total}</p>
                    </div>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary  btn-lg" onClick={handleCheckout}>
                        Checkout
                    </button>

                </div>
            </div>
        </div>
    )
}