import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext =createContext();

const AuthProvider = ({ children }) => {
    // const [auth, setAuth] = useState({
    //     user: null,
    //     token: ''
    // });

    const [auth, setAuth] = useState({ token: localStorage.getItem('token'),
        user: null
     });

    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
    // axios.defaults.headers.common["Authorization"] = auth?.token;

    
    useEffect( () => {
       const data = localStorage.getItem('auth');
       if(data) {
       const  parsedData= JSON.parse(data); 
        setAuth({
            ...auth,
            msj : parsedData.msj,
            user : parsedData.userData,
            token : parsedData.token
        })
       }
    },[auth.token])

    // useEffect(() => {
    //     if (auth.token) {
    //       localStorage.setItem('token', auth.token);
    //     } else {
    //       localStorage.removeItem('token');
    //     }
    //   }, [auth.token]);

    return (
    <AuthContext.Provider value={[auth, setAuth]} >
        {children}
    </AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext);

export { AuthProvider, useAuth };