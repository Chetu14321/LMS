

import React, { useState } from "react";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import axios from "axios"
import useAuth from "../../Hooks/useAuth";







export default function Login() {
    const [user, setUser] = useState({
        // name: '',
        email: '',
        // mobile: '',
        password: ''
    });
    const Navigate=useNavigate()
    const {setIsLogin,setToken}=useAuth()

    const readInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            // console.log("user",user)
            await axios.post(`/api/auth/login`, user)
            .then(res=>{
                toast.success(res.data.msg)
                setToken(res.data.token)
                setIsLogin(true)
                Navigate('/dashboard')
            }).catch(err=>toast.error(err.response.data.msg))

        }
        catch(err){
            toast.error(err.message)
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
                                    <input
                                        type="submit"
                                        value="Login User"
                                        className="btn btn-outline-success"
                                    />
                                    <input
                                        type="reset"
                                        value="Clear"
                                        className="btn btn-outline-warning"
                                       
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

