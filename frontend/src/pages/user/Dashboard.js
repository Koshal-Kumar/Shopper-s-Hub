import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-50 mx-5 p-3">
            <h1>Welcome : {(auth?.user?.name)}</h1>
              <h4>Email : {(auth?.user?.email)}</h4>
              <h4>Contact number : {(auth?.user?.phone)}</h4>
              <p>Address : {(auth?.user?.address)}</p>
          </div>

        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Dashboard
