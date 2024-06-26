import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import "./cartPage.css";
import Spinner from "../components/Spinner";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [ok ,setOk] = useState(false)
  const [image,setImage] = useState(`Grocery cart Loader.gif`);
  const [orders,setOrders] =useState([]);
  const [loader,setLoader] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);


  const handleShowModal = (id) => {
    setItemToRemove(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  const removeCartItem = () => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.item_id === itemToRemove);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  

  const discount = () =>{
    let discountedPrice = 0 ;

    cart.map((item)=>{
      discountedPrice += ((item.price)*((item.discount)*0.01))*(item.quantityInCart)
    })
    return discountedPrice;
  }

  const totalPrice = () => {
    let total = 0;
    cart.map((item) => {
      total = total + (item.price)*(item.quantityInCart);
    });
    return total;
  };

  const incrementQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.item_id === id ? { ...item, quantityInCart: item.quantityInCart + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.item_id === id && item.quantityInCart > 1 ? { ...item, quantityInCart: item.quantityInCart - 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/item/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
     setLoader(true)
      console.log("cart ki items", cart )
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/item/braintree/payment`,
        { nonce, cart }
      );
      console.log(data)
      if(data.ok){
        setOk(true)
        setImage(`payment-success.gif`)
      }
      else{
        setOk(false)
      }
      setLoading(false);
      localStorage.removeItem("cart");
      toast.success("order placed Succesfully");
      setCart([]);
      setTimeout(() => {
        setLoader(false)
        navigate("/dashboard/user/orders");
      }, 4500);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
        {loader && (
        <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />
      )}
      <div className="container">
        <div className="row" style={{ padding: "15px" }}>
          <div className="col-md-12">
            <h3 className="text-center mb-1" style={{ fontWeight : "400",}}>
              { cart.length ?`Hello ${
                auth?.token && auth?.user?.name
              }! Are you ready to make some Purchase`:""}
            </h3>
            
            
          {  !cart.length ? (
              <div style={{ display: 'flex', flexDirection:"column",justifyContent: 'center' , alignItems: 'center'  }}>
                {ok?"":<h4 >OOPS! Cart is Empty</h4>}
                <img src={`images/${image}`} alt="gif" height="400px" width="400px" style={{ margin: '0 40px 0 0' }} />
          </div>
            ) : (
              ""
            )}


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
                   {myProduct?.description?.substring(0, 30)}...
                  </p>
                  <div className="quantity-price-col">
                  <p
                    style={{ fontSize: "16px", margin: "0", padding: "5px 0 " }}
                  >
                    <strong>Price : </strong> 
                   <span style={{ textDecoration: "line-through" }}>&#x20B9;{myProduct.price}</span><span>   &#x20B9;{myProduct.price - ((myProduct.price)*(myProduct.discount)*0.01)}</span>
                  </p>
                  <p
                    style={{display : "flex" ,alignItems:"center", fontSize: "16px", margin: "0", padding: "5px 0" ,flexDirection: "row"}}
                  >
                    <strong>Quantity : </strong>
                    <div className="quantity-controls-cart ">
                      <button  onClick={ () => decrementQuantity(myProduct.item_id)}>
                        -
                      </button>
                      <span className="quantity-span  text-center">
                      {myProduct.quantityInCart}  
                      
                      </span>
                      <button onClick={() => incrementQuantity(myProduct.item_id)} >
                        +
                      </button>
                    </div>
                  </p>
                  </div>
                 
                  <button
                    className="btn btn-danger p-1 px-3"
                    onClick={() => handleShowModal(myProduct.item_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 &&(
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
                   &#x20B9;{totalPrice()-discount()}
                 </p>
               </div>
               <div className="mt-2 w-100 d-flex flex-column justify-content-center payment-container">
                 {  clientToken && (
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
          )
           
          }
          
        </div>
      </div>

      <div className={`modal fade ${showModal ? "show d-block" : "d-none"} modal-overlay`} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Remove Item</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to remove this item from your cart?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={removeCartItem}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;




