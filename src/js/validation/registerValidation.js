import { getUsers } from '../../api/user';

const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

    const errorMsg = {
        upper: "Password Must Contain atleast 1 Captial letter",
        num: "Password Must Contain atleast 1 number",
        less: "Password Must be atleast 8 characters"
    }

    if (password.match(regex)) {
        return { valid: true, msg: '' };
    }


    if (password === password.toLowerCase()) {
        return { valid: false, msg: errorMsg.upper };

    }
    if (!password.match(/\d/g)) {
        return { valid: false, msg: errorMsg.num };
    }

    if (password.length < 8) {
        return { valid: false, msg: errorMsg.less };
    }

    return { valid: false, msg: ` ${errorMsg.upper} <br> ${errorMsg.less} <br> ${errorMsg.num} ` };
}

const validateConfirmPassword = (confirm, password) => {
    const errorMsg = "Passwords Doesnt Match";
    if (confirm === password && confirm.trim() !== "") {
        return { valid: true, msg: '' }
    }
    return { valid: false, msg: errorMsg };
}

const validateName = (target, field = "name", n = 2,) => {
    const regex = new RegExp(`[a-zA-z]{${n},}`, 'g');
    const errorMsg = {
        less: `${field} Cant be less than ${n} letters`,
        num: "You cant Enter Numbers as a name"
    }

    if (target.trim().match(regex)) {
        return { valid: true, msg: '' };
    }

    if (!isNaN(Number(target))) {
        return { valid: false, msg: errorMsg.num };
    }

    return { valid: false, msg: errorMsg.less };
}

const validateEmail = async (email, skip) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const errorMsg = "Enter a Vaild Email address";
    const res = await getUsers()
    const users = res.data;
    let exists = false;

    users.forEach(user => {
        if (user.email === skip) {
            return
        }
        if (email === user.email) {
            exists = true;
        }
    });

    if (exists) {
        return { valid: false, msg: 'Email already has an account' };
    }

    if (email.trim().match(regex)) {
        return { valid: true, msg: '' };
    }

    return { valid: false, msg: errorMsg };
}



const valdaiteUsername = async (username, skip = "") => {
    let exists = false;
    const res = await getUsers()
    const users = res.data;

    users.forEach(user => {
        if (user.username === skip) {
            return
        }
        if (username === user.username) {
            exists = true;
        }
    });
    if (!exists) {
        return validateName(username, "username", 3)
    }

    return { valid: false, msg: "Username Already Exists" }
}


const handleRegister = async (username, password, firstName, lastName, email, conPassword) => {
    const exists = await valdaiteUsername(username);
    const vpassword = validatePassword(password);
    const vCPassord = validateConfirmPassword(conPassword, password);
    const vFisrtName = validateName(firstName);
    const vLastName = validateName(lastName);
    const vEmail = await validateEmail(email);
    const msg = {
        username: exists,
        password: vpassword,
        cpassword: vCPassord,
        firstName: vFisrtName,
        lastName: vLastName,
        email: vEmail

    }
    const allVaild = exists.valid &&
        vpassword.valid &&
        vEmail.valid &&
        vCPassord.valid &&
        vFisrtName.valid &&
        vLastName.valid

    return { allVaild, ...msg }

}

const handleSave = async (username, password, firstName, lastName, email, conPassword, skip, skipEmail) => {
    const exists = await valdaiteUsername(username, skip);
    if (password.trim() === "" && conPassword.trim() === "") {
        return exists &&
            await validateEmail(email, skipEmail) &&
            validateName(firstName) &&
            validateName(lastName)
    }

    return exists &&
        validatePassword(password) &&
        await validateEmail(email, skipEmail) &&
        validateConfirmPassword(conPassword, password) &&
        validateName(firstName) &&
        validateName(lastName)
}

export { valdaiteUsername, validateConfirmPassword, validateEmail, validateName, validatePassword, handleRegister, handleSave };