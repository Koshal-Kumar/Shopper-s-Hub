import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../components/layouts/ProductCard";
import { Badge } from "antd";
import { useAuth } from "../../context/auth";

const Products = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loader, setLoader] = useState(false);

  // const getProducts = async () => {
  //   try {
  //     setLoader(true)
  //     const { data } = await axios.get( `${process.env.REACT_APP_API}/item/show?page=${page}&limit=${limit}`);
  //     console.log(data.record);
  //     setProducts(...products , data.record);
  //     setMeta(data.meta)
  //     console.log(products);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.msj);
  //   }finally{
  //     setLoader(false);
  //   }
  // };
  const getProducts = async () => {
    try {
      setLoader(true);
      console.log(auth.token);
      if (!auth.token) {
        console.log("token missing");
      }
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/item/show?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setMeta(data.meta);
      setProducts(data.record);
      console.log(data);
      console.log(meta);
    } catch (error) {
      console.log(error);
      toast.error(error.msj);
    } finally {
      setLoader(false);
      console.log(loader);
    }


  };

  useEffect(() => {
    getProducts();
  }, [products.length, page, limit]);

  return (
    <Layout>
      <div className="page-width">
        <div className="row align-items-start">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <div className="quantity-display">
              <div className="col">
                <strong>
                  **Showing {meta.itemsPerPage} out of {meta.totalItems} products
                </strong>
              </div>
            </div>
            <div className="d-flex flex-wrap card-container">
              {products.map((product) => (
                <div
                  className="product-card-link"
                  // to={`/dashboard/admin/update-product/${product.item_id}`}
                  key={product.item_id}
                >
                  <Badge.Ribbon
                    color="red"
                    placement="start"
                    text={`${product.discount}% off`}
                    style={{ fontSize: '16px', padding: '6px 20px' }}
                  >
                    <ProductCard
                      myProduct={product}
                      key={product.item_id}
                      showButton={false}
                    />
                  </Badge.Ribbon>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pagination-container">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => {
                    setLoader(true);
                    setPage(page > 1 ? page - 1 : 1);
                  }}
                >
                  <span aria-hidden="true">« </span>
                  <span className="sr-only"> Previous</span>
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    setLoader(true);
                    setPage(1);
                  }}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLoader(true);
                    setPage(2);
                  }}
                >
                  2
                </a>
              </li>

              {meta.totalPages > 3 ? (
                <li style={{ display: "flex" }}>
                  <a href="#" className="page-link" disabled>
                    <span>...</span>
                  </a>
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setLoader(true);
                      setPage(meta.totalPages);
                    }}
                  >
                    {meta.totalPages}
                  </a>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => {
                      setLoader(true);
                      setPage(3);
                    }}
                  >
                    3
                  </a>
                </li>
              )}
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => {
                    setLoader(true);
                    setPage(page < meta.totalPages ? page + 1 : page);
                  }}
                >
                  <span className="sr-only">Next </span>
                  <span aria-hidden="true"> »</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="display-limit">
          <div className="col">
            <label htmlFor="">Enter the limit for records </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
