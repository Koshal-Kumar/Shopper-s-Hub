import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { Badge, Checkbox, Radio } from "antd";
import { useAuth } from "../context/auth";
import { Prices } from "../components/Prices";
import ProductCard from "../components/layouts/ProductCard";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCart } from "../context/cart";
import Spinner from "../components/Spinner";

const Home = () => {

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState(null);

  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const [loader, setLoader] = useState(false);

  console.log("from home",page,limit)


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/category`);
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("cart items: ", cartItems);

  const filterCartItem = (_id) => {
    const matchedItem = cartItems.find((item) => item.item_id === _id);

    return matchedItem ? matchedItem.quantityInCart : null;
  };

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
    if (!checked.length && !radio) {
      getProducts();
    }
  }, [checked.length, radio, page,limit ]);
 

  useEffect(() => {
    if (checked.length || radio) {
      filterProduct();
    }
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(checked);
  };

  const filterProduct = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/item/product-filters`,
        { checked, radio }
      );
      console.log(data);
      setProducts(data?.products);
      console.log(loader);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      console.log(loader)
    }
  };

  const handleClearFilter = () => {
    setRadio(null);
    setChecked([]);
  };
  console.log(products, "kkk");

  return (
    <Layout title={`All Products - Best Offers`}>
        
        {loader && <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />}
      <div className="banner-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop
          // style={{maxHeight : "290px"}}
          // className="home-banner-slider mt-5"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide className="swiper-slide">
            <img
              src="images/electronics-banner-3.jpg"
              alt="banner"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img
              src="images/electronics-banner-2.jpg"
              alt="banner"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>

          <SwiperSlide className="swiper-slide">
            <img
              src="images/electronics-banner-4.jpg"
              alt="banner"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img
              src="images/electronics-banner-3.jpg"
              alt="banner"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="page-width">
        <div className="row align-items-start home-body">
          <div className="col-md-2  filter-container">
            <div className="row">
              <div className="col filter-box">
                <h4 className=" mt-3">Filter By Category</h4>
                <div className="d-flex flex-column px-3">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c.id}
                      checked={checked.includes(c.name)}
                      onChange={(e) => handleFilter(e.target.checked, c.name)}
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#7B7B7C",
                      }}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className="col filter-box">
                <h4 className=" mt-3">Filter By Price</h4>
                <div className=" px-3 ">
                  <Radio.Group
                    onChange={(e) => setRadio(e.target.value)}
                    value={radio}
                  >
                    {Prices?.map((p) => (
                      <div className="radio-container">
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>
            <button
              className="btn btn-danger clear-btn"
              onClick={handleClearFilter}
            >
              Clear Filters
            </button>
          </div>

          <div className="col-md-10 card-wala-box">
            
            <div className="quantity-display">
              <div className="col">
                <strong>
                  **Showing {meta.itemsPerPage} out of {meta.totalItems} products
                </strong>
              </div>
            </div>
            <div className=" card-container">
              {products.map((item, index) => (
                <Link
                  key={item.item_id}
                  className="product-card-link"
                  to={`/product-details/${item.item_id}`}
                >
                  <Badge.Ribbon
                    color="red"
                    placement="start"
                    text={`${item.discount}% off`}
                    style={{ fontSize: "16px", padding: "6px 20px" }}
                  >
                    <ProductCard
                      myProduct={item}
                      key={item.item_id}
                      quantityInC={filterCartItem(item.item_id)}
                      showButton={true}
                    />
                  </Badge.Ribbon>
                </Link>
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
                    <input type="number" 
                      value={limit}
                      onChange={(e)=>setLimit(e.target.value)}/>
                  </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
