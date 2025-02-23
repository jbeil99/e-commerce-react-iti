import ProductCard from "../components/ProductCard";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction, search } from '../store/productSlice'
import Aside from "../components/Aside";
import filterIcon from "../assets/icon/filter.png";
import { isFiveDaysOld } from "../js/helpers/bagesHelpers";


export default function Shop() {
    const { products, isLoading, errors } = useSelector(store => store.productSlice)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsAction());

    }, [])

    const handleSearch = (e) => {
        dispatch(getAllProductsAction());
        if (!e.target.value.trim()) {
            dispatch(getAllProductsAction());
            return;
        }
        dispatch(search(e.target.value));
    }
    const handleBadge = (product) => {
        const badge = {
            name: '',
            show: false
        }
        if (product.sale > 0) {
            badge.name = 'discount';
            badge.show = true;
        }
        if (isFiveDaysOld(product.createdAt)) {
            badge.name = 'new';
            badge.show = true;
        }
        return badge;
    }

    return (
        <main className="shop-section  my-5">
            <div className="container-fluid container-xxl">

                <section className="row  row-cols-1 row-cols-lg-2 justify-content-lg-between justify-content-center align-items-start">
                    <Aside />

                    <div className="col-lg-9 col-12 col row row-cols-1 justify-content-md-between justify-content-center align-items-center gap-4">
                        <nav className="navbar navbar-light bg-light col-12 justify-content-lg-between justify-content-center align-items-center px-2 rounded p-2">
                            <div className="container-fluid">
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                </form>

                                <div className="display-style d-flex gap-2 align-items-center">
                                    <p className="ms-2 mt-3">We found {products.length} items for you!</p>
                                    <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#filter-aside" aria-controls="filter-aside" aria-expanded="false"
                                        aria-label="Toggle filter">
                                        <img src={filterIcon} className="d-block d-lg-none" alt="flter" />
                                    </button>
                                </div>
                            </div>
                        </nav>
                        <div className="col-12 row row-cols-1 row-cols-md-3 row-cols-xl-4 gap-4 justify-content-center">
                            {isLoading && !errors && <div className='mt-5 alert alert-dark'><h1>Loading ...... </h1></div>}
                            {errors && <div className='mt-5 alert alert-danger'>{errors.message}</div>}
                            {!isLoading && !errors && products.map(product => {
                                return < ProductCard product={product} badge={handleBadge(product)} key={product.id} />

                            })}
                        </div>
                    </div>

                </section>
            </div>

        </main>
    )
}