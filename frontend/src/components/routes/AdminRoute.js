import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  console.log(process.env.BACKEND_LIVE_URL);

  useEffect(() => {
    const authCheck = async () => {
      
        const res = await axios.get(
          `http://localhost:8080/user/admin-auth`,{headers:{'Authorization':`Bearer ${auth.token}`}}
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false); 
        }
     
    };
    if (auth?.token) authCheck();
   
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
