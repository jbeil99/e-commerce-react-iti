import { handleLogin } from "../js/validation/loginValidation";
import { currentUser } from "../js/validation/loginValidation";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/userSlice";
import Swal from "sweetalert2";
import { updateUserCart } from "../api/cart";
import { getUserCart } from "../api/cart";
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setData] = useState({
        username: '',
        password: ''
    });
    const [validation, setvalidtion] = useState({
        valid: null,
        msg: ''
    });

    const handleSumbit = async (e) => {
        e.preventDefault();
        const data = await handleLogin(loginData.username, loginData.password);
        setvalidtion(data);
        if (validation.valid) {
            sessionStorage.setItem('user', JSON.stringify(currentUser));
            const sessionCart = JSON.parse(sessionStorage.getItem('cart'));
            const userCart = await getUserCart(currentUser.id);
            console.log({ ...userCart.data[0], ...sessionCart });
            await updateUserCart(userCart.data[0].id, { ...userCart.data[0], ...sessionCart })
            sessionStorage.removeItem('cart');
            dispatch(setCurrentUser(currentUser));
            Swal.fire({
                title: `Welcome! ${currentUser.firstName} ${currentUser.lastName}`,
                icon: "success"
            });
            navigate('/')
        }

    }
    const handleInput = (e) => {
        setData({ ...loginData, [e.target.name]: e.target.value });
    }

    return (
        <main className='section-container login d-flex justify-contnet-center align-items-center'>

            <form className="needs-validation border p-5 mx-auto row gap-3" id='signin' onSubmit={handleSumbit}>
                <div className="col-md-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className={`form-control ${validation.valid === true ? 'is-valid' : (validation.valid === false ? 'is-invalid' : '')}`} id="username" placeholder="Username" defaultValue={loginData.username} name="username" onChange={handleInput} required />
                    <div className="invalid-feedback">
                        {validation.msg}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control ${validation.valid === true ? 'is-valid' : (validation.valid === false ? 'is-invalid' : '')}`} name="password" placeholder="Password" onChange={handleInput} required />
                    <div className="invalid-feedback">
                        {validation.msg}
                    </div>
                    {/* <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            Please choose a username.
                        </div> */}
                </div>
                <div className="col-md-12">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </main>
    )
}