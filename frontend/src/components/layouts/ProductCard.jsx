import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

function ProductCard({ myProduct, quantityInC, showButton }) {
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const [showButtonAdd, setShowButtonAdd] = useState(true);
  const [cart, setCart] = useCart();
  const [quantityInCart, setQuantityInCart] = useState(quantityInC);
  const [loader, setLoader] = useState(false);

  // cart button   
    const addToCart = () => {
      setQuantityInCart(1);
      const updatedCart = [...cart, { ...myProduct, quantityInCart: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Item added to cart');
    };
  
    const incrementQuantity = () => {
      const newQuantity = quantityInCart + 1;
      setQuantityInCart(newQuantity);
      const updatedCart = cart.map(item =>
        item.item_id === myProduct.item_id ? { ...item, quantityInCart: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
  
    const decrementQuantity = () => {
      if (quantityInCart > 1) {
        const newQuantity = quantityInCart - 1;
        setQuantityInCart(newQuantity);
        const updatedCart = cart.map(item =>
          item.item_id === myProduct.item_id ? { ...item, quantityInCart: newQuantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        removeFromCart();
      }
    };
  
    const removeFromCart = () => {
      setQuantityInCart(0);
      const updatedCart = cart.filter(item => item.item_id !== myProduct.item_id);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.info('Item removed from cart');
    };



  const handleDeleteProduct = async (item_id) => {
    try {
        let answer = window.confirm(`Are you sure you want to delete`);
        if (answer) {
        setLoader(true);
          const { data } = await axios.delete(
            `${process.env.REACT_APP_API}/item/delete/${item_id}`
            );
          
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/");
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }finally{
      setLoader(false)
    }
  };


  useEffect(() => setShowButtonAdd(showButton), []);

  return (
    <div className="card product-card">
      <div className="card-img-container">
        {!showButtonAdd && auth.user.role === 'admin' ? (
          <div className="del-edit-box">
            <button onClick={()=>{
              setLoader(true);
              navigate(`/dashboard/admin/update-product/${myProduct.item_id}`)
              // setLoader(false);
              }}>
              <svg
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                 width="16px"
                height="16px"
              >
                <path
                  d="M0 14.2V18h3.8l11-11.1L11 3.1 0 14.2ZM17.7 4c.4-.4.4-1 0-1.4L15.4.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L16 5.9 17.7 4Z"
                  fill="#f1f1f1"
                  fill-rule="evenodd"
                  class="fill-000000"
                ></path>
              </svg>
            </button>

            <button  onClick={()=>{
              console.log(auth.user.role)
              if(!showButtonAdd && auth.user.role == "admin"){
                handleDeleteProduct(myProduct.item_id)
                console.log("deletefunctioncall")
              }
            }}>
              <svg
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
              >
                <path
                  d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4c-16.8 0-32.4 8.827-41 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16c0 8.9 7.125 16 16 16h16v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16c8.9 0 16-7.1 16-16V96c0-8.87-7.1-16-16-16zM171.9 50.88c1-1.75 3-2.88 5.1-2.88h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4l17.5-29.12zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320c0 8.8-7.2 16-16 16zm-128-48c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16s-16 7.2-16 16v208c0 8.8 7.2 16 16 16zm-80 0c8.8 0 16-7.2 16-16V192c0-8.844-7.156-16-16-16s-16 7.2-16 16v208c0 8.8 7.2 16 16 16zm160 0c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16s-16 7.2-16 16v208c0 8.8 7.2 16 16 16z"
                  fill="#f1f1f1"
                  class="fill-000000"
                ></path>
              </svg>
            </button>
           
          </div>
        ) : (
          ""
        )}
        <img
          src={`/images/items-img/${myProduct?.image}`}
          className="card-img-top card-img"
          alt="img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{myProduct?.name}</h5>
        <p className="card-text">
         
          {myProduct?.description.substring(0, 30)}...
        </p>
        <div className="card-detail d-flex justify-content-between">
          <div className="col d-flex flex-column flex-sm-fill">
            <label
              htmlFor="price"
              style={{ fontWeight: "bold", fontSize: "14px" }}
            >
              Price
            </label>
            <span>Rs. {myProduct?.price}</span>
          </div>
          <div className="col d-flex flex-column text-end flex-sm-fill">
            <label
              htmlFor="price"
              style={{ fontWeight: "bold", fontSize: "14px" }}
            >
              Available
            </label>
            {myProduct?.quantity < 10 ? (
              <span style={{ color: "red", fontSize: "14px" }}>
                Only {myProduct?.quantity} left
              </span>
            ) : (
              <span style={{ fontSize: "14px" }}>{myProduct?.quantity}</span>
            )}
          </div>
        </div>
        <div className="btn-container d-flex justify-content-end">
          {/* <Link
            // key={myProduct.item_id}
            className="add-cart-link"
            // to={`/cart`}
          >
            <button
              className="btn btn-primary mt-2 add-btn"
              onClick={() => {
                setCart([...cart, myProduct]);
                localStorage.setItem(
                  "cart", 
                  JSON.stringify([...cart, myProduct])
                );
                toast.success("item added to cart");
              }}
        {auth?.user?.role === "user" ? (
          <div className="btn-container d-flex justify-content-end">
            <Link
              key={myProduct.item_id}
              className="add-cart-link"
              style={{ textDecoration: "none" }}
              // to={`/cart`}
            >
              Add to Cart
            </button>
          </Link> */}

          <Link
            key={myProduct.item_id}
            className="add-cart-link"
            style={{textDecoration: 'none'}}
            // to={`/cart`}
          >
            {quantityInCart == 0 || quantityInCart==null? (
              <button
                className="btn btn-primary mt-2 add-btn w-100"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div className="quantity-controls mt-2 w-100">
                <button
                  className="btn"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <span className="quantity-span  text-center">{quantityInCart}</span>
                <button
                  className="btn "
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            )}
            </Link>
          

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
