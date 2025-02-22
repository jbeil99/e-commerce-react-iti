import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getProductById } from '../api/product';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addProductAction, editProductAction } from '../store/productSlice';
import Swal from 'sweetalert2'
import { handleProduct } from '../js/validation/productValidation';
export default function ProductForm() {
    const { user } = useSelector(store => store.userSlice);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = user ? user : JSON.parse(sessionStorage.getItem('user'));
    const [productData, setProductData] = useState({
        name: "",
        price: '',
        rating: 0,
        customerPrice: '',
        category: {
            id: '',
            name: ''
        },
        seller: {
            id: 1,
            name: 'clicon'
        },
        quantity: '',
        description: '',
        image: '',
        reviews: [],
        sale: '',
        approved: false
    });

    const [vaildation, setVaildtion] = useState({
        allVaild: null,
        price: {
            valid: null,
            msg: ""
        },
        quantity: {
            valid: null,
            msg: ""
        },
        cquantity: {
            valid: null,
            msg: ""
        },
        name: {
            valid: null,
            msg: ""
        },
        image: {
            valid: null,
            msg: ""
        },
        customerPrice: {
            valid: null,
            msg: ''
        },
        sale: {
            valid: null,
            msg: ''
        },
        description: {
            valid: null,
            msg: ''
        }
    });


    useEffect(() => {
        if (id !== '0') {
            getProductById(id)
                .then((response) => setProductData(response.data))
                .catch((error) => { console.log(error) });
        }

    }, [])

    const handleSumbit = async (e) => {
        e.preventDefault();
        handleProduct(productData.name,
            productData.price,
            productData.customerPrice,
            productData.quantity,
            productData.sale,
            productData.image,
            productData.description,
            currentUser,
            id == 0 ? '' : productData.name
        ).then(res => {
            setVaildtion(res)
            if (res.allVaild) {
                if (id === '0') {
                    try {
                        dispatch(addProductAction(productData))
                        Swal.fire({
                            title: "Done!",
                            text: "Product has been added",
                            icon: "success"
                        });
                        navigate('/shop')
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    dispatch(editProductAction({ id: id, productData: productData }))
                    Swal.fire({
                        title: "Done!",
                        text: "Product has been Edited",
                        icon: "success"
                    });
                    navigate('/shop')
                }
            }

        })
    }


    const handleInput = (e) => {
        setProductData({
            ...productData, [e.target.name]: e.target.name == 'category'
                ? { id: e.target.selectedOptions[0].value, name: e.target.selectedOptions[0].innerText }
                : e.target.value
        })
    }


    return (
        <main className='section-container mb-5 d-flex justify-contnet-center align-items-center'>
            <form className="needs-validation border p-5 mx-auto row gy-2" id='product' onSubmit={handleSumbit}>
                <div className="col-md-12">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input type="text" className={`form-control ${vaildation.name.valid === true ? 'is-valid' : (vaildation.name.valid === false ? 'is-invalid' : '')}`} id="name" placeholder="Product Name" defaultValue={productData.name} name="name" onChange={handleInput} required />
                    <div className="invalid-feedback">
                        {vaildation.name.msg}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="image" className="form-label">Product Image</label>
                    <input type="url" className={`form-control ${vaildation.image.valid === true ? 'is-valid' : (vaildation.image.valid === false ? 'is-invalid' : '')}`} name="image" placeholder="Product Image URL" onChange={handleInput} required defaultValue={productData.image} />
                    <div className="invalid-feedback">
                        {vaildation.image.msg}
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className={`form-control ${vaildation.price.valid === true ? 'is-valid' : (vaildation.price.valid === false ? 'is-invalid' : '')}`} name="price" placeholder="Price" onChange={handleInput} required defaultValue={productData.price} />
                    <div className="invalid-feedback">
                        {vaildation.price.msg}
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="customerPrice" className="form-label">Customer Price</label>
                    <input type="number" className={`form-control ${vaildation.customerPrice.valid === true ? 'is-valid' : (vaildation.customerPrice.valid === false ? 'is-invalid' : '')}`} name="customerPrice" placeholder="Customer Price" onChange={handleInput} required defaultValue={productData.customerPrice} />
                    <div className="invalid-feedback">
                        {vaildation.customerPrice.msg}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="sale" className="form-label">Sale</label>
                    <input type="sale" className={`form-control ${vaildation.sale.valid === true ? 'is-valid' : (vaildation.sale.valid === false ? 'is-invalid' : '')}`} name="sale" placeholder="sale" onChange={handleInput} required defaultValue={productData.sale} />
                    <div className="invalid-feedback">
                        {vaildation.sale.msg}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="quantity" className={`form-control ${vaildation.quantity.valid === true ? 'is-valid' : (vaildation.quantity.valid === false ? 'is-invalid' : '')}`} name="quantity" placeholder="quantity" onChange={handleInput} required defaultValue={productData.quantity} />
                    <div className="invalid-feedback">
                        {vaildation.quantity.msg}
                    </div>
                </div>
                <div className='col-md-12 my-2'>
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select " aria-label="Default select example" id='category' name='category' value={productData.category.id} onChange={handleInput}>
                        <option value="2">Fire</option>
                        <option value="1">Water</option>
                        <option value="3">Earth</option>
                    </select>
                </div>
                <div className="form-floating col-md-12 w-100 ">
                    <textarea className={`form-control ${vaildation.description.valid === true ? 'is-valid' : (vaildation.description.valid === false ? 'is-invalid' : '')}`} placeholder="Leave a comment here" id="floatingTextarea2" value={productData.description} onChange={handleInput} name='description'></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                    <div className="invalid-feedback">
                        {vaildation.description.msg}
                    </div>
                </div>

                <div className="col-md-12">
                    <button className="btn btn-primary  mt-2" type="submit">{id != 0 ? 'Save Product' : 'Add Product'}</button>
                </div>
            </form>
        </main>
    );
}

