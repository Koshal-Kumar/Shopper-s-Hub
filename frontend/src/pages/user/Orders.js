import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
const Orders = () => {
  const [orders,setOrders] =useState([]);
  const [auth,setAuth] = useAuth()

  const getOrder = async() =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/user/get-orders`)
      setOrders(data.data);
      console.log(data.data)
    } catch (error) {
      
    }
  }
  useEffect(() =>{
    if(auth?.token)getOrder()
    }, [auth?.token])

  return (
    <Layout>
        <div className="page-width">
        <div className="container-fluid m-3 p-3">
        <div className="row align-items-start">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">Orders</h3>
             
                <div className="border shadow">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <td scope="column">#</td>
                        <td scope="column">Status</td>
                        <td scope="column">Buyer</td>
                        <td scope="column">Date</td>
                        <td scope="column">Orders</td>
                        <td scope="column">Payment</td>
                        <td scope="column">Quantity</td>
                      </tr>
                    </thead>
             {orders?.map((o,i) =>{
              return(
                    <tbody>
                      <tr>
                        <td>{i+1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer_name}</td>
                        <td>{moment(o?.created_at).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.payment?.transaction?.amount }</td>
                        <td>{o?.products.length}</td>
                      </tr>
                    </tbody>
              )
            })}
                  </table>
                  
                </div>

          </div>
          </div>
          </div>
        </div>
      </Layout>
  )
}

export default Orders
