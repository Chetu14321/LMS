import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const location = useLocation(); // <-- to read redirectTo param
    const { setIsLogin, setToken } = useAuth();

    const readInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/auth/login`, user);
            toast.success(res.data.msg);
            setToken(res.data.token);
            setIsLogin(true);

            const redirectTo = new URLSearchParams(location.search).get("redirectTo");

            if (res.data.role === "admin") {
                navigate("/dashboard/admin");
            } else if (redirectTo) {
                navigate(redirectTo); // e.g. /course/12345
            } else {
                navigate("/dashboard/user");
            }

        } catch (err) {
            toast.error(err.response?.data?.msg || err.message);
        }
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header text-center">
                            <h6 className="display-6 text-secondary">Login</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={user.email}
                                        onChange={readInput}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Your Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={user.password}
                                        onChange={readInput}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="Login User" className="btn btn-outline-success" />
                                    <input type="reset" value="Clear" className="btn btn-outline-warning ms-2" />
                                </div>
                                <div className="form-group mt-3 text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-link text-primary"
                                        onClick={() => navigate("/Forgotpassword")}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="form-group mt-3 text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-link text-primary"
                                        onClick={() => navigate("/register")}
                                    >
                                        Don't have an account? Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
