import React from "react";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductCard({ myProduct }) {
  const [cart, setCart] = useCart();
console.log()
  return (
    <div className="card product-card">
      <div className="card-img-container">
        <img
          src={`/images/items-img/${myProduct?.image}`}
          className="card-img-top card-img"
          alt="img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{myProduct?.name}</h5>
        <p className="card-text"> {myProduct?.description.substring(0, 30)}...</p>
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
            {myProduct?.quantity<10 ?<span style={{ color : "red"  , fontSize: "14px"}}>Only {myProduct?.quantity} left</span> : <span style={{ fontSize: "14px"}}>{myProduct?.quantity}</span>}
          </div>
        </div>
        <div className="btn-container d-flex justify-content-end">
          <Link
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
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
