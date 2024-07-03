import React, { useState } from "react";
import Layout from "../../components/layouts/Layout.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Spinner from "../../components/Spinner.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/user/signup`, {
        name,
        email,
        password,
        phone,
        address,
        role,
      });
      console.log("ho gya");
      if (res.data.success) {
        setLoader(true)
        setTimeout(()=>{
          toast.success(res.data.msj);
          navigate("/login");
          setLoader(false)
        }, 1500);
       
        console.log("form submitted");
      } else {
        toast.error(res.data.msj);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };
  return (
    // <Layout>
    <>
    {loader && <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />}
      <div className="background-wrapper">
        <img src="background-electronics.jpg" alt="background poster" />
      </div>
      <div className="signup-wrapper-content">
        <div className="signup-body-wrapper d-flex justify-content-center align-items-center w-100 "
        style={{ height: "100vh" }}>
        <div className="signup-container">
        <div className="signup">
        <div className="signup-box">
          <h3>Signup Page</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control no-focus-outline"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control no-focus-outline"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control no-focus-outline"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control no-focus-outline"
                placeholder="Phone"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control no-focus-outline"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control no-focus-outline"
                placeholder="Role"
                required
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
        </div>
        </div>
       
     
      </div>
      </>
      
    // </Layout>
  );
};

export default Signup;
