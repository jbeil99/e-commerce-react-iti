
import axios from "axios";
const baseURL = "http://localhost:3000/carts";

const getCart = (cartID) => axios.get(`${baseURL}/${cartID}`);
const addUserCart = (userID) => axios.post(`${baseURL}`, { userID, items: [] });
const deleteCartProduct = async (cartID, productID) => {
    const res = await getCart(cartID);
    const cart = res.data;
    return axios.put(`${baseURL}/${cartID}`, {
        userID: cart.userID,
        items: cart.items.filter(item => item.productID !== productID)
    });
};

const emptyCart = (id) => axios.patch(`http://localhost:3000/carts/${id}`, { items: [] });

const checkProduct = (items, productID) => {
    for (let item of items) {
        if (item.productID === productID) {
            return true;
        }
    }
}

const addProductToCart = async (cartID, productID, quantity = 1) => {
    const res = await getCart(cartID);
    const cart = res.data;
    const items = [...cart.items];

    if (checkProduct(items, productID)) {
        items.forEach(item => {
            if (item.productID === productID) {
                item.quantity = Number(item.quantity) + quantity;
            }
        });
    } else {
        items.push({ productID, quantity });
    }

    return axios.put(`${baseURL}/${cartID}`, {
        userID: cart.userID,
        items
    });
};

const updateCartItemsQuantity = async (cartID, productID, quantity = 1, userID) => {
    const res = await getCart(cartID);
    const cart = res.data;

    const items = cart.items.map(item =>
        item.productID === productID ? { ...item, quantity } : item
    );

    return axios.put(`${baseURL}/${cartID}`, { userID, items });
};


const addProdcutToLocalStorageCart = (productID, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const items = cart.items;
    if (checkProduct(items, productID)) {
        items.forEach(item => {
            if (item.productID === productID) {
                item.quantity += quantity;
            }
        })
    } else {
        items.push({
            productID,
            quantity
        })
    }
    localStorage.setItem("cart", JSON.stringify({
        items
    }))
}

export {
    getCart,
    addUserCart,
    deleteCartProduct,
    emptyCart,
    checkProduct,
    addProductToCart,
    addProdcutToLocalStorageCart,
    updateCartItemsQuantity
};
