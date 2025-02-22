import { validateName } from "./registerValidation.js";
import { getAllProducts } from "../../api/product.js";
const validateProductName = async (target, seller, skip = "") => {
    const res = await getAllProducts();
    const products = res.data;
    let exists = false;
    products.forEach(product => {
        if (product.name === skip) {
            return
        }
        if (product.name.trim() === target.trim() && product.seller.id == seller.id) {
            exists = true;
        }
    });
    if (!exists) {
        return validateName(target, "product name", 2);
    }

    return { valid: false, msg: "product Already Exists" }
}

const validatePrice = (price, custPrice = Number(price.value) * 1.2) => {
    const errorMsg = {
        empty: "price cant be empty",
        less: "price cant be less than 1",
        custLow: "customer price cant be less than or equal price"
    }

    if (!price) {
        return { valid: false, msg: errorMsg.empty }
    }
    if (price <= 0) {
        return { valid: false, msg: errorMsg.less }
    }
    if (custPrice <= Number(price)) {
        return { valid: false, msg: errorMsg.custLow }
    }
    return { valid: true, msg: '' };
}

const validateQuantity = (target) => {
    const errorMsg = {
        empty: "Quantity cant be empty",
        less: "Quantity cant be less than 1",
    }
    if (target < 0) {
        return { valid: false, msg: errorMsg.less }
    }
    return { valid: true, msg: '' }
}

const validateImage = (target) => {
    const errorMsg = "Please upload an image (PNG or JPEG).";
    if (target.trim() === "") {
        return { valid: false, msg: errorMsg }
    }
    return { valid: true, msg: '' };
}

const validateDescription = (target) => {
    const errorMsg = "description must be atleast 20 characters";
    if (target.trim().length < 20) {
        return { valid: false, msg: errorMsg }
    }
    return { valid: true, msg: '' };
}

const validateDiscount = (target) => {
    const errorMsg = "discount cant be more than 100%";

    if (target > 100) {
        return { valid: false, msg: errorMsg }
    }
    return { valid: true, msg: '' };
}

const handleProduct = async (name, price, custPrice, quantity, discount, image, description, seller, skip = "") => {
    const vdescription = validateDescription(description);
    const VImage = validateImage(image);
    const vPrice = validatePrice(price);
    const vCustPrice = validatePrice(price, custPrice);
    const vQuantity = validateQuantity(quantity);
    const vName = await validateProductName(name, seller, skip);
    const vDiscount = validateDiscount(discount);

    const msg = {
        description: vdescription,
        image: VImage,
        customerPrice: vCustPrice,
        price: vPrice,
        quantity: vQuantity,
        name: vName,
        sale: vDiscount
    }

    const allVaild = VImage.valid &&
        vName.valid &&
        vPrice.valid &&
        vQuantity.valid &&
        vCustPrice.valid &&
        vDiscount.valid &&
        vdescription.valid

    return { allVaild, ...msg }
}



export { validateDescription, validateImage, validatePrice, validateQuantity, validateProductName, handleProduct }
