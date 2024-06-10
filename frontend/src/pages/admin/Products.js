import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../components/layouts/ProductCard";
import { Badge } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/item/show`);
      console.log(data.record);
      setProducts(data.record);
      console.log(products);
    } catch (error) {
      console.log(error);
      toast.error(error.msj);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="page-width">
        <div className="row align-items-start">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            {/* <h2 className="text-center">Products List</h2> */}
            <div className="d-flex flex-wrap card-container">
              {products.map((product) => (
                <Link
                  className="product-card-link"
                  to={`/dashboard/admin/update-product/${product.item_id}`}
                  key={product.item_id}
                >
                  <Badge.Ribbon
                    color="red"
                    placement="start"
                    text={`${product.discount}% off`}
                    style={{ fontSize: "16px", padding: "6px 20px" }}
                  >
                    <ProductCard
                      myProduct={product}
                      key={product.item_id}
                      showButton={false}
                    />
                  </Badge.Ribbon>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
