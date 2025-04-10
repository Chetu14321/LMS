import React,{createContext, useEffect, useState,useCallback} from "react";


import { toast } from "react-toastify";
import axios from "axios";
export const AuthContext = createContext()
export default function AuthProvider(props){

    const [isLogin,setIsLogin] = React.useState(false)
    const [token,setToken] = React.useState(null)


    //verify the token user
    const [user,setUser] = useState(false)
    const verifyToken = useCallback(async () => {
        if(token){
            await axios.get(`/api/auth/verify`)
            .then(res=>{
                toast.success(res.data.msg)
                setUser(res.data.user)
            }).catch(err=>{toast.error(err.response.data.msg)})
        }

    },[token])


    useEffect(()=>{
        verifyToken()
    },[token])
    return(
        <AuthContext.Provider value={{isLogin,token,setToken,setIsLogin, user, setUser}}>
            {
                props.children
            }
        </AuthContext.Provider>
    )

}