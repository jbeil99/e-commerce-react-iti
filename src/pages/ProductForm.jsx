import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getProductById } from '../api/product';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addProductAction, editProductAction } from '../store/productSlice';
import Swal from 'sweetalert2'

export default function ProductForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        name: "",
        price: '',
        rating: 4.5,
        category: 'Electronics',
        seller: "Foodtree",
        quantity: '',
        description: '',
        img: ''
    });

    useEffect(() => {
        if (id !== '0') {
            getProductById(id)
                .then((response) => setProductData(response.data))
                .catch((error) => { console.log(error) })
        }

    }, [])


    const handleForm = async (e) => {
        e.preventDefault();
        if (id === '0') {
            try {
                dispatch(addProductAction(productData))
                await Swal.fire({
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

            await Swal.fire({
                title: "Done!",
                text: "Product has been Edited",
                icon: "success"
            });
            navigate('/shop')
        }

    }


    const getData = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }


    return (
        <div className="container my-5 w-50">
            <Form className='mb-5' onSubmit={handleForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Title" name='name' value={productData.name} onChange={getData} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" name='price' value={productData.price} onChange={getData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter Quantity" name='quantity' value={productData.quantity} onChange={getData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="img">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="url" placeholder="Enter Product Image url" name='img' value={productData.img} onChange={getData} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Disabled select menu</Form.Label>
                    <Form.Select id="category" onChange={getData} value={productData.category} name='category'>
                        <option value='Electronics'>Electronics</option>
                        <option value='Accessories'>Accessories</option>

                    </Form.Select>
                </Form.Group>
                <FloatingLabel controlId="floatingTextarea2" label="description">
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                        className='mb-3'
                    />
                </FloatingLabel>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    );
}

