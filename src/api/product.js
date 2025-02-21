import axios from "axios";
const baseURL = "http://localhost:3000/products";

const getAllProducts = () => axios.get(baseURL);
const getProductById = (productId) => axios.get(`${baseURL}/${productId}`);
const addNewProduct = (product) => axios.post(`${baseURL}`, product);
const deleteProduct = (productId) => axios.delete(`${baseURL}/${productId}`);
const editProduct = (productId, product) =>
    axios.put(`${baseURL}/${productId}`, product);

// const updateProdcutQuantity = (productId, quantity) => axios.patch(`${baseURL}/${productId}`, quantity);
const softDeleteProduct = (productId, sellerDeleted = true) => axios.patch(`${baseURL}/${productId}`, { sellerDeleted });
const toggleApproveProduct = (productId, approved = true) => axios.patch(`${baseURL}/${productId}`, { approved });
const getCategories = () => axios.get(`http://localhost:3000/categories`);

const updateProductQuantity = async (id, quantity) => {
    try {
        const productResponse = await getProductById(id);
        const product = productResponse.data;

        const response = await axios.patch(`${baseURL}/${id}`, {
            quantity: product.quantity - quantity
        });
        return response.data;
    } catch (error) {
        console.error("Error updating product quantity:", error);
        throw error;
    }
};
export {
    getAllProducts,
    getProductById,
    addNewProduct,
    deleteProduct,
    editProduct,
    updateProductQuantity,
    getCategories,
    toggleApproveProduct,
    softDeleteProduct,

};