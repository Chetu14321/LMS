import React,{createContext} from "react";
export const AuthContext = createContext()
export default function AuthProvider(props){

    const [isLogin,setIsLogin] = React.useState(false)
    const [token,setToken] = React.useState(null)
    return(
        <AuthContext.Provider value={{isLogin,token,setToken,setIsLogin}}>
            {
                props.children
            }
        </AuthContext.Provider>
    )

}