import ProductCard from "../components/ProductCard";
import { useEffect } from 'react';
import { Link } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction, filter } from '../store/productSlice'
export default function Shop() {
    let { products, isLoading, errors } = useSelector(store => store.productSlice)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [])

    const handleSearch = (e) => {
        if (!e.target.value.trim()) {
            dispatch(getAllProductsAction());
            return;
        }
        dispatch(filter(e.target.value));
    }

    return (
        <section className="product-section px-2 px-lg-0 section-container my-5">
            <div className="row mb-md-5 mb-3 row-cols-1 row-cols-sm-2 justify-content-between ">
                <h2 > Products</h2>
                <ul className="nav justify-content-md-end justify-content-start">
                    <Link to="/products/0/edit" className='btn btn-outline-primary me-2'>
                        Add Product
                    </Link>
                    <input type="Search" className='w-25 form-control' placeholder='Search ....' onChange={handleSearch} />
                </ul>
            </div>
            <div className="row row-cols-1 row-cols-xxl-5 row-cols-lg-4 row-cols-md-2 justify-content-center gap-3">
                {isLoading && !errors && <div className='mt-5 alert alert-dark'><h1>Loading ...... </h1></div>}
                {errors && <div className='mt-5 alert alert-danger'>{errors.message}</div>}
                {!isLoading && !errors && products.map(product => <ProductCard {...product} key={product.id} btnText="hello" />)}
            </div>

        </section>
    )
}