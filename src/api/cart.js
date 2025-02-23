
import axios from "axios";
const baseURL = "http://localhost:3000/carts";

const getCart = (cartID) => axios.get(`${baseURL}/${cartID}`);
const getUserCart = (userID) => axios.get(`${baseURL}?userID=${userID}`);
const addUserCart = (userID) => axios.post(`${baseURL}`, { userID, items: [] });
const updateUserCart = (cartID, cart) => axios.patch(`${baseURL}/${cartID}`, cart);

const deleteCartProduct = async (cartID, productID) => {
    const res = await getCart(cartID);
    const cart = res.data;
    return axios.put(`${baseURL}/${cartID}`, {
        userID: cart.userID,
        items: cart.items.filter(item => item.productID !== productID)
    });
};

const emptyCart = (id) => axios.patch(`${baseURL}/${id}`, { items: [] });

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


const addProdcutToSessionCart = (productID, quantity = 1) => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (!cart) {
        sessionStorage.setItem('cart', JSON.stringify({ items: [] }))
        let cart = JSON.parse(sessionStorage.getItem("cart"));
    }
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
    sessionStorage.setItem("cart", JSON.stringify({
        items
    }));
}
const removeProdcutToSessionCart = (productID) => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
        const items = cart.items.filter(item => item.productID !== productID);
        const newCart = { items };
        sessionStorage.setItem('cart', JSON.stringify(newCart))
    }
}

export {
    getCart,
    addUserCart,
    deleteCartProduct,
    emptyCart,
    checkProduct,
    addProductToCart,
    addProdcutToSessionCart,
    updateCartItemsQuantity,
    getUserCart,
    removeProdcutToSessionCart,
    updateUserCart
};
