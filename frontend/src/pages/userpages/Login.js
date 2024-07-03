import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import Spinner from "../../components/Spinner";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [auth, setAuth] = useAuth();
  const modalRef = useRef(null);
  const [loader,setLoader] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/user/login`, {
        name,
        email,
        role,
        password,
      });
      if (res.data.success) {
        setLoader(true);
        toast.success(res.data.msj);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        setLoader(false);
      } else {
        toast.error(res.data.msj);
      }
    } catch (error) {
      toast.error(error.response.data.msj);
      console.log(error);
    }
  };

 const handleNavigate = ()=>{
  setLoader(true)
  setTimeout(()=>{
    navigate("/signup")
    setLoader(false)
  },1000)
  
 }

  return (
    <>
     {loader && <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />}
      <div
        className="login-body-wrapper d-flex justify-content-center align-items-center w-100 "
        style={{ height: "100vh" }}
      >
        <div
          className="col-md-7  d-flex gap-3 justify-content-center align-items-center "
          style={{ background: "black", height: "100%" }}
        >
          <img
            src="login.png"
            alt="contactus"
            style={{ width: "100px", height: "100px" }}
          />
          <h1
            className="text-center"
            style={{ color: "white", margin: "0", fontSize: "56px" }}
          >
            SHOPPER'S HUB
          </h1>
        </div>
        <div
          className="col-md-5  d-flex justify-content-center align-items-center "
          style={{ background: "#F8F9FA", height: "100%" }}
        >
          <div className="login-container">
            <div className="login">
              <div className="login-box">
                <h3>Login Page</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control no-focus-outline"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control no-focus-outline"
                      placeholder="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control no-focus-outline"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control no-focus-outline"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn ">
                    Submit
                  </button>
                </form>
                <div className="col">
                  <Link
                    to="#"
                    style={{
                      textDecoration: "none",
                      marginTop: "10px",
                      color: "black",
                    }}
                    onClick={()=>handleNavigate()}
                  >
                    Do Not Have An Account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Login;
