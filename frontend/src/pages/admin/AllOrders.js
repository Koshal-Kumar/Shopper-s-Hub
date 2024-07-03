import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/auth'
import moment from 'moment'

const AllOrders = () => {

  const [allOrders,setAllOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllOrders = async () => {
    try {
      console.log("in api call koshal")
      const respose = await axios.get(`${process.env.REACT_APP_API}/user/all-orders`)
      if(respose){
        setAllOrders(respose.data.data.rows);
       toast.success(respose.msj)
       console.log(respose)
       console.log(respose.data.data.rows)
      }
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(()=>{getAllOrders()}, [])

  return (
    <Layout>
      <div className="page-width">
      <div className="row align-items-start">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
          
              <h3 className="text-center">Orders</h3>

              <div className="border shadow">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Time of Order</th>
                      <th scope="col">Order</th>
                      <th scope="col">Order Status</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders?.map((o, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer}</td>
                        <td>{moment(o?.created_at).fromNow()}</td>
                        <td>
                          <ul
                            style={{
                              textDecoration: "none",
                              listStyle: "circle",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            {o?.products.map((product) => (
                              <li>
                                {product.name} -{" "}
                                <span>{product.quantityInCart}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.payment?.transaction?.amount?o?.payment?.transaction?.amount:"Failed"}</td>
                        {(() => {
                          const totalQuantityInCart = o?.products.reduce(
                            (total, product) => total + product.quantityInCart,
                            0
                          );
                          return <td>{totalQuantityInCart}</td>;
                        })()}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           
           
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AllOrders
