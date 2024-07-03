import React from "react";
import Layout from "../components/layouts/Layout";
import { useSearch } from "../context/search";
import ProductCard from "../components/layouts/ProductCard";
import { Badge } from "antd";

const SearchPage = () => {
  const [values, setValues] = useSearch();

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("cart items: ", cartItems);
  
  const filterCartItem = (_id) => {
    const matchedItem = cartItems.find((item) => item.item_id === _id);

    return matchedItem ? matchedItem.quantityInCart : null;
  };
  return (
    <Layout>
      <div className="page-width">
        <div className="body-search-container">
          <h1 className="mt-4">Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Products Found" : ``}</h6>
          <div className=" mt-2 p-2 search-item-container">
            {values?.results.map((p) => (
              <Badge.Ribbon
                color="red"
                placement="start"
                text={`${p.discount}% off`}
                style={{ fontSize: "16px", padding: "6px 20px" }}
              >
                <ProductCard
                  myProduct={p}
                  key={p.item_id}
                  quantityInC={filterCartItem(p.item_id)}
                />
              </Badge.Ribbon>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
