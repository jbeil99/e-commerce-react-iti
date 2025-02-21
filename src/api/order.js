
import axios from "axios";
const baseURL = "http://localhost:3000/orders";

const getOrders = () => axios.get(`${baseURL}`);
const getOrder = (orderID) => axios.get(`${baseURL}/${orderID}`);
const getUserOrders = (userID) => axios.get(`${baseURL}?userID=${userID}`);
const addOrder = (order) => axios.post(`${baseURL}`, order);
const deleteOrder = (orderID)=> axios.delete(`${baseURL}/${orderID}`);


export {
    getOrders,
    getUserOrders,
    getOrder,
    deleteOrder,
    addOrder
};

// "use stric



// const updateOrder = async (id, body) => {
//     try {
//         const response = await fetch(`http://localhost:3000/orders/${id}`, {
//             method: "PUT",
//             body: JSON.stringify(body)
//         });

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         return json
//     } catch (e) {
//         console.log(e)
//     }
// }


// const softDeleteOrder = async (id, value = true) => {
//     try {
//         const response = await fetch(`http://localhost:3000/orders/${id}`, {
//             method: "PATCH",
//             body: JSON.stringify({
//                 orderDeleted: value
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         return json
//     } catch (e) {
//         console.log(e)
//     }
// }


// const cancelOrder = async (id, value = true) => {
//     try {
//         const response = await fetch(`http://localhost:3000/orders/${id}`, {
//             method: "PATCH",
//             body: JSON.stringify({
//                 orderCanceld: value
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         return json
//     } catch (e) {
//         console.log(e)
//     }
// }

// export { getOrder, getOrders, getUserOrders, addOrder, softDeleteOrder, updateOrder, cancelOrder };