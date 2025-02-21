import { getUsers } from "../../api/user";
let currentUser = null;

const checkUsername = (username, users) => {
    let exists = false;
    users.forEach(user => {
        if (username.trim() === user.username && user.userDeleted !== true) {
            currentUser = user;
            exists = true;
            return;
        }
    });
    if (exists) {
        return { valid: true, msg: '' }
    }
    return { valid: false, msg: "Incorrect Username or Password" };
}

const checkPassword = (password, user) => {
    if (user.password === password) {
        return { valid: true, msg: '' }
    }
    return { valid: false, msg: "Incorrect Username or Password" };
}

const handleLogin = async (username, password) => {
    const res = await getUsers();
    const users = res.data;
    let valid = checkUsername(username, users);
    if (valid.valid) {
        valid = checkPassword(password, currentUser);
    }
    return valid
}
export { handleLogin, currentUser };