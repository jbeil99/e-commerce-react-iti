import { handleRegister } from "../js/validation/registerValidation";
import { useState } from "react";
import { useNavigate } from "react-router";
import { addUser } from "../api/user";
import { addUserCart } from "../api/cart";
export default function Register() {
    const navigate = useNavigate();
    const [formData, setData] = useState({
        firstName: '',
        username: '',
        password: '',
        lastName: '',
        email: '',
        cpassword: ''
    });
    const [vaildation, setVaildtion] = useState({
        allVaild: null,
        username: {
            valid: null,
            msg: ""
        },
        password: {
            valid: null,
            msg: ""
        },
        cpassword: {
            valid: null,
            msg: ""
        },
        firstName: {
            valid: null,
            msg: ""
        },
        lastName: {
            valid: null,
            msg: ""
        },
        email: {}
    });

    const handleSumbit = (e) => {
        e.preventDefault();
        handleRegister(formData.username, formData.password, formData.firstName, formData.lastName, formData.email, formData.cpassword).then(res => {
            setVaildtion(res)
            if (res.allVaild) {
                const { cpassword, ...user } = formData;
                user.role = 'customer';
                addUser(user).then(res => addUserCart(res.data.id).then(res => navigate('/login')))
            }
        })

    }
    const handleInput = (e) => {
        setData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <main className='section-container mb-5 d-flex justify-contnet-center align-items-center'>
            <form className="needs-validation border p-5 mx-auto row gy-2" id='signin' onSubmit={handleSumbit}>
                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className={`form-control ${vaildation.firstName.valid === true ? 'is-valid' : (vaildation.firstName.valid === false ? 'is-invalid' : '')}`} id="firstName" placeholder="First name" defaultValue={formData.firstName} name="firstName" onChange={handleInput} required />
                    <div className="invalid-feedback">
                        {vaildation.firstName.msg}
                    </div>
                </div>
                <div className="col-md-6 is-valid">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className={`form-control ${vaildation.lastName.valid === true ? 'is-valid' : (vaildation.lastName.valid === false ? 'is-invalid' : '')}`} name="lastName" placeholder="Last name" onChange={handleInput} required defaultValue={formData.lastName} />
                    <div className="invalid-feedback">
                        {vaildation.lastName.msg}
                    </div>
                </div>
                <div className="col-md-12 is-valid">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className={`form-control ${vaildation.username.valid === true ? 'is-valid' : (vaildation.username.valid === false ? 'is-invalid' : '')}`} name="username" placeholder="Username" onChange={handleInput} required defaultValue={formData.username} />
                    <div className="invalid-feedback">
                        {vaildation.username.msg}
                    </div>
                </div>
                <div className="col-md-12 is-valid">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className={`form-control ${vaildation.email.valid === true ? 'is-valid' : (vaildation.email.valid === false ? 'is-invalid' : '')}`} name="email" placeholder="Email" onChange={handleInput} required defaultValue={formData.email} />
                    <div className="invalid-feedback">
                        {vaildation.email.msg}
                    </div>
                </div>
                <div className="col-md-12 is-valid">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control ${vaildation.password.valid === true ? 'is-valid' : (vaildation.password.valid === false ? 'is-invalid' : '')}`} name="password" placeholder="Password" onChange={handleInput} required defaultValue={formData.password} />
                    <div className="invalid-feedback">
                        {vaildation.password.msg}
                    </div>
                </div>
                <div className="col-md-12 is-valid">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className={`form-control ${vaildation.cpassword.valid === true ? 'is-valid' : (vaildation.cpassword.valid === false ? 'is-invalid' : '')}`} name="cpassword" placeholder="Confirm Password" onChange={handleInput} required defaultValue={formData.cpassword} />
                    <div className="invalid-feedback">
                        {vaildation.cpassword.msg}
                    </div>
                </div>
                <div className="col-md-12">
                    <button className="btn btn-primary  mt-2" type="submit">Register</button>
                </div>
            </form>
        </main>
    )
}