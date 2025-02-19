import axios from "axios";
const baseURL = "http://localhost:3000/products";

const getAllProducts = () => axios.get(baseURL);
const getProductById = (productId) => axios.get(`${baseURL}/${productId}`);
const addNewProduct = (product) => axios.post(`${baseURL}`, product);
const deleteProduct = (productId) => axios.delete(`${baseURL}/${productId}`);
const editProduct = (productId, product) =>
    axios.put(`${baseURL}/${productId}`, product);

const updateProdcutQuantity = (productId, quantity) => axios.patch(`${baseURL}/${productId}`, quantity);
const softDeleteProduct = (productId, sellerDeleted = true) => axios.patch(`${baseURL}/${productId}`, { sellerDeleted });
const toggleApproveProduct = (productId, approved = true) => axios.patch(`${baseURL}/${productId}`, { approved });


export {
    getAllProducts,
    getProductById,
    addNewProduct,
    deleteProduct,
    editProduct,
    updateProdcutQuantity
};