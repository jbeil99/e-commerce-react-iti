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



