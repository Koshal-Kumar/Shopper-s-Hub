import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import "./ProductDetails.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [loader,setLoader] = useState(false)

  console.log(params);
  const [productDetails, setProductDetails] = useState("");
  const [quantityInC, setQuantityInC] = useState(0);

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("cart items from detaiuls: ", cartItems);

  const filterCartItem = (params) => {
    const matchedItem = cartItems.find((item) => item.item_id == params.id);
    console.log(matchedItem);
    return matchedItem ? matchedItem.quantityInCart : null;
  };

  useEffect(() => {
    setQuantityInC(filterCartItem(params));

    console.log(quantityInC);
    console.log(filterCartItem(params));
  }, [cart]);

  // button events
  const addToCart = () => {
    setQuantityInC(1);
    console.log(productDetails);
    const updatedCart = [...cart, { ...productDetails, quantityInCart: 1 }];
    setCart(updatedCart);
    console.log(updatedCart);
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };

  const incrementQuantity = () => {
    const newQuantity = quantityInC + 1;
    setQuantityInC(newQuantity);
    console.log(productDetails);
    const updatedCart = cart.map((item) =>
      item.item_id == productDetails.item_id
        ? { ...item, quantityInCart: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = () => {
    if (quantityInC > 1) {
      const newQuantity = quantityInC - 1;
      setQuantityInC(newQuantity);
      const updatedCart = cart.map((item) =>
        item.item_id == productDetails.item_id
          ? { ...item, quantityInCart: newQuantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      removeFromCart();
    }
  };

  const removeFromCart = () => {
    setQuantityInC(0);
    const updatedCart = cart.filter(
      (item) => item.item_id !== productDetails.item_id
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  // api call
  const getProduct = async (params) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/item/show/${params.id}`
      );
      console.log(data);
      setProductDetails(data?.record);

      console.log(productDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(params);
  }, [params]);

  console.log(cart);
  console.log(quantityInC);


  const handleBuyNow = (e,item_id)=>{
    e.preventDefault();
    setLoader(true);
    addToCart();  
    setTimeout(() => {
      navigate(`/cart`);
      setLoader(false);
    }, 1000); 
  };
  return (
    <Layout>
       {loader && (
        <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />
      )}
      <div className="page-width">
        <div className="product-details-container">
          <h2 className="text-center">Product Details</h2>
          {productDetails ? (
            <div className="product-grid" key={productDetails?.id}>
              <div className="col col-left">
                <div className=" image-part">
                  <img
                    src={`/images/items-img/${productDetails?.image}`}
                    alt="img"
                  />
                </div>
              </div>
              <div className="col col-right">
                <h3>{productDetails.name}</h3>
                <p>{productDetails.description} </p>
                <div className="price-section">
                  <p
                    className="price-green"
                    style={{ color: "green", padding: "0", margin: "0" }}
                  >
                    Special Price
                  </p>
                  <div className="price-row">
                    <strong style={{ fontSize: "28px", fontWeight: "500" }}>
                      &#x20B9;
                      {productDetails.price -
                        productDetails.price * productDetails.discount * 0.01}
                    </strong>
                    <span style={{ textDecoration: "line-through" }}>
                      &#x20B9;{productDetails.price}
                    </span>
                    <span className="price-discount">
                      {productDetails.discount}% OFF
                    </span>
                  </div>
                </div>

                <div className="offers-avail">
                  Offers Available
                  <ul>
                    <li>
                      Save upto {productDetails.discount}% on{" "}
                      {productDetails.name}
                    </li>
                  </ul>
                </div>

                {auth?.user?.role !== "admin" ? (
                  <div className=" button-part">
                    {quantityInC == 0 || quantityInC == null ? (
                      <button
                        className="btn btn-primary btn-col add-btn w-100"
                        onClick={() => {
                          if (!auth.token) {
                            setLoader(true);
                            setTimeout(() => {
                              navigate("/login");
                              setLoader(false);
                            }, 1000);
                          } else {
                            addToCart();
                          }
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-controls w-100">
                        <button className="btn" onClick={decrementQuantity}>
                          -
                        </button>
                        <span className="quantity-span  text-center">
                          {quantityInC}
                        </span>
                        <button className="btn " onClick={incrementQuantity}>
                          +
                        </button>
                      </div>
                    )}

                    <Link onClick={(e)=>handleBuyNow(e)}>
                      <button className="btn btn-success btn-col">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                ) :""
                }
              </div>  
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
