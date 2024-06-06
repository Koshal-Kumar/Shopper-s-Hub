import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.item_id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const discount = () =>{
    let discountedPrice = 0 ;

    cart.map((item)=>{
      discountedPrice += (item.price)*((item.discount)*0.01)
      console.log(discountedPrice)
    })
    return discountedPrice;
  }

  const totalPrice = () => {
    let total = 0;
    cart.map((item) => {
      total = total + item.price;
    });
    return total;
  };

  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/item/braintree/token`
      );
      setClientToken(data?.clientToken);
      console.log(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/item/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      console.log("data", data);
      navigate("/dashboard/user/orders");
      toast.success("oreder completed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row" style={{ padding: "15px" }}>
          <div className="col-md-12">
            <h3 className="text-center mb-1">
              {`Hello ${
                auth?.token && auth?.user?.name
              }! Are you ready to make some Purchase`}
            </h3>
            <h4 className="text-center ">
              {!auth.token
                ? "Please login to checkout"
                : !cart.length
                ? "Your cart is empty"
                : ""}
            </h4>
          </div>
        </div>
        <div
          className="row align-items-start body-cart "
          style={{ padding: "15px" }}
        >
          <div className="col-md-6 cart-item-container">
            {cart.map((myProduct) => (
              <div
                className="row card  flex-row cart-item"
                style={{ padding: "15px" }}
              >
                <div
                  className="col-md-4"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                >
                  <img
                    src={`/images/items-img/${myProduct?.image}`}
                    className="card-img-top card-img cart-img"
                    alt="img"
                  />
                </div>
                <div className="col-md-8">
                  <h4>{myProduct.name}</h4>
                  <p
                    style={{ fontSize: "16px", margin: "0", padding: "5px 0 " }}
                  >
                    {myProduct.description}
                  </p>
                  <p
                    style={{ fontSize: "16px", margin: "0", padding: "5px 0 " }}
                  >
                    <strong> &#x20B9; {myProduct.price}</strong>
                  </p>
                  <button
                    className="btn btn-danger p-1 px-3"
                    onClick={() => removeCartItem(myProduct.item_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col order-summary ">
            <div className="summary-card col  d-flex flex-column justify-content-center  p-2 card">
              <h3 className="text-center mb-0 ">Order Summary</h3>
              <div className="col cart-disp">
                <p style={{ fontSize: "16px", margin: "0", padding: "2px 0 " }}>
                  <strong>Total items: </strong>
                  {cart.length}
                </p>
                <p style={{ fontSize: "16px", margin: "0", padding: "2px 0 " }}>
                  <strong>Total Price: </strong>
                  &#x20B9;{totalPrice()}
                </p>
                <p style={{ fontSize: "16px", margin: "0", padding: "2px 0 " }}>
                  <strong>Discount : </strong>
                  &#x20B9;{discount()}
                </p>
                <p style={{ fontSize: "16px", margin: "0", padding: "2px 0 " }}>
                  <strong>Amount to be Paid: </strong>
                  &#x20B9;{totalPrice() - discount()}
                </p>
              </div>
              <div className="mt-2 w-100 d-flex flex-column justify-content-center payment-container">
                {clientToken && (
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                )}
                <button
                  className="btn btn-success"
                  onClick={handlePayment}
                  disabled={!instance || loading || !auth.user}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
