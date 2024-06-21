import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./form.css";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [auth, setAuth] = useAuth();

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
        toast.success(res.data.msj);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.msj);
      }
    } catch (error) {
      toast.error(error.response.data.msj);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="page-width">
        <div className="login-container">
        <div className="login">
        <div className="login-box">
          <h3>Login Page</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
      
    </Layout>
  );
};

export default Login;
