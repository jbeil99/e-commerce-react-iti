
import axios from "axios";
const baseURL = "http://localhost:3000/orders";

const getOrders = () => axios.get(`${baseURL}`);
const getOrder = (orderID) => axios.get(`${baseURL}/${orderID}`);
const getUserOrders = (userID) => axios.get(`${baseURL}?userID=${userID}`);
const addOrder = (order) => axios.post(`${baseURL}`, order);
const deleteOrder = (orderID) => axios.delete(`${baseURL}/${orderID}`);


export {
    getOrders,
    getUserOrders,
    getOrder,
    deleteOrder,
    addOrder
};
