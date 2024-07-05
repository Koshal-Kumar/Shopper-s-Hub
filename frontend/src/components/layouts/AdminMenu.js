import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const AdminMenu = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const handleNavigate = (e, address, itemName) => {
    e.preventDefault();
    setLoader(true);
    setActiveItem(itemName);
    setTimeout(() => {
      navigate(address);
      setLoader(false);
    }, 1000);
  };

  return (
    <>
      {loader && <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />}
      <div className="text-center">
        <div className="list-group">
          <h3 className="text-center mt-3">Admin Panel</h3>
          <NavLink
            className={`list-group-item list-group-item-action `}
            onClick={(e) => handleNavigate(e, "/dashboard/admin/create-category", "create-category")}
            to="/dashboard/admin/create-category"
          >
            Create Category
          </NavLink>
          <NavLink
            className={`list-group-item list-group-item-action `}
            onClick={(e) => handleNavigate(e, "/dashboard/admin/create-product", "create-product")}
            to="/dashboard/admin/create-product"
          >
            Create Product
          </NavLink>
          <NavLink
            className={`list-group-item list-group-item-action`}
            onClick={(e) => handleNavigate(e, "/dashboard/admin/products", "products")}
            to="/dashboard/admin/products"
          >
            Products
          </NavLink>
          <NavLink
            className={`list-group-item list-group-item-action`}
            onClick={(e) => handleNavigate(e, "/dashboard/admin/allorders", "orders")}
            to="/dashboard/admin/allorders"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
