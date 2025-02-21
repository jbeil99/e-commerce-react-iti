
import { useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../store/productSlice';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { deleteProductAction, search } from '../store/productSlice';
import { useNavigate } from 'react-router';
const Dashboard = () => {
    let { products, isLoading, errors } = useSelector(store => store.productSlice)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [])

    const handleSearch = (e) => {
        if (!e.target.value.trim()) {
            dispatch(getAllProductsAction());
            return;
        }
        dispatch(search(e.target.value));
    }


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
                dispatch(deleteProductAction(e.target.dataset.id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="container mt-5 dashboard">
            <div className="d-flex justify-content-between mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search products..."
                    onChange={handleSearch}
                    style={{ width: '300px' }}
                />
                <Link className="btn btn-primary" to={`/products/0/edit`} >
                    Add Product
                </Link>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>seller</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.price}</td>
                            <td>{product.seller.name}</td>
                            <td className='text-center'>
                                <Link to={`/products/${product.id}/edit`} className='btn btn-info me-2'>Edit</Link>
                                <Link to={`/products/${product.id}`} className='btn btn-info me-2'>View</Link>

                                <button className='btn btn-danger' onClick={handleDelete} data-id={product.id}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Dashboard;
