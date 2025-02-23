import { useEffect, useState } from 'react';
import { getCategories } from '../api/product';
import { useDispatch, useSelector } from 'react-redux';
import { filter, getAllProductsAction } from '../store/productSlice'

export default function Aside() {
    const { products, isLoading, errors } = useSelector(store => store.productSlice)
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [filterProduct, setFilter] = useState({
        category: '0',
        price: '0'
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories()
                setCategories(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, [])

    const handleFilter = (e) => {
        setFilter({ ...filterProduct, [e.target.name]: e.target.value })
    }

    // TODO: Fix issue after filter you cant use another filter

    const getFilterProduct = (e) => {
        if (filterProduct.category == 0 && filterProduct.price == 0) {
            dispatch(getAllProductsAction());
            return;
        }
        dispatch(filter(filterProduct));
    }

    return (
        <aside className="col-lg-3 col rounded mb-4 mb-lg-0 collapse d-lg-block" id="filter-aside">
            <div className="filter-section">
                <h5>Product Category</h5>
                <ul className="list-unstyled">
                    <li className="form-check  d-flex">
                        <input type="radio" defaultChecked className="form-check-input" id="juice-drinks" data-id="0" value="0" name="category" onChange={handleFilter} />
                        <label className="form-check-label ms-2" htmlFor="juice-drinks">
                            All
                        </label>
                    </li>
                    {categories.map(category => {
                        return (
                            <li className="form-check  d-flex" key={category.id}>
                                <input type="radio" className="form-check-input" id="juice-drinks" data-id={category.id} value={category.id} name="category" onChange={handleFilter} />
                                <label className="form-check-label ms-2" htmlFor="juice-drinks">
                                    {category.name}
                                </label>
                            </li>
                        )
                    })}
                </ul>

                <h5>Price</h5>
                <ul className="list-unstyled">
                    <li className="form-check  d-flex">
                        <input type="radio" defaultChecked className="form-check-input" id="juice-drinks" value="0" name="price" onChange={handleFilter} />
                        <label className="form-check-label ms-2" htmlFor="juice-drinks">
                            All
                        </label>
                    </li>
                    <li className="form-check">
                        <input type="radio" className="form-check-input" value="1" name="price" onChange={handleFilter} />
                        <label className="form-check-label" htmlFor="blue-color">
                            under 500
                        </label>
                    </li>
                    <li className="form-check">
                        <input type="radio" className="form-check-input" value="2" name="price" onChange={handleFilter} />
                        <label className="form-check-label" htmlFor="blue-color">
                            500-1000
                        </label>
                    </li>
                    <li className="form-check">
                        <input type="radio" className="form-check-input" value="3" name="price" onChange={handleFilter} />
                        <label className="form-check-label" htmlFor="blue-color">
                            above 1000
                        </label>
                    </li>
                </ul>
            </div>

            <button className="btn btn-primary" onClick={getFilterProduct}>Apply Filters</button>
        </aside>
    )
}