import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../components/layouts/UserMenu';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
const [auth,setAuth] =useAuth()
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="page-width">
        <div className="container-fluid m-3 p-3">
        <div className="row align-items-start">
          <div className="col-md-3">
            <UserMenu />
          </div>
          </div>
          </div>
        </div>

    </Layout>
  )
}

export default Profile
