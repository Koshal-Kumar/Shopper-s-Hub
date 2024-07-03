import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const currentUser = auth.user.email
console.log(currentUser)
  const getOrder = async (cUser) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/user/get-orders/${cUser}`);
      setOrders(data.data);
      console.log("dtaa.data",data.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (auth?.token) getOrder(currentUser);
  }, [auth?.token]);

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
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Shipping</th>
                     
                      <th scope="col">Time of Order</th>
                      <th scope="col">Order Items</th>
                      <th scope="col">Order Status</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                      
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
      </div>
    </Layout>
  );
};

export default Orders;
