import axios from "axios";
const baseURL = "http://localhost:3000/users";

const getUsers = () => axios.get(`${baseURL}`);
const getUser = (userID) => axios.get(`${baseURL}/${userID}`);
const addUser = (user) => axios.post(`${baseURL}`, user);
const deleteUser = (userID) => axios.delete(`${baseURL}/${userID}`);
const updateUser = (userID, user) => axios.pu(`${baseURL}/${userID}`, user)

export {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
    getUser,
};

// export { getUsers, addUser, deleteUser, updateUser, getUser, SoftDeleteUser, toggleApproveSeller };
// "use strict";

// const getUsers = async () => {
//     const response = await fetch("http://localhost:3000/users");
//     const users = await response.json();
//     return users
// }

// const getUser = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`);
//         if (!response.ok) {
//             return null
//         }
//         const user = await response.json();
//         return user
//     } catch (e) {
//         console.log(e)
//     }
// }

// const addUser = async (body) => {
//     try {
//         const response = await fetch("http://localhost:3000/users", {
//             method: "POST",
//             body: JSON.stringify(body),
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

// const updateUser = async (id, body) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             body: JSON.stringify(body)
//         });

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         return json;
//     } catch (e) {
//         console.log(e)
//     }
// }

// const deleteUser = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`, {
//             method: "DELETE",
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

// const SoftDeleteUser = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             body: JSON.stringify({
//                 userDeleted: true
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

// const toggleApproveSeller = async (id, approve) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             body: JSON.stringify({
//                 approved: approve,
//                 role: approve ? "seller" : "customer"
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


