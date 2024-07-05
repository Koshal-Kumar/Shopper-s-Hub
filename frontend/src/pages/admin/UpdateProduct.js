import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import {  Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [id, setId] = useState("");
  const  [loader,setLoader] =useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/category`);
      if (data.success) {
        console.log(data);
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getOneProduct = async () => {
    try {
  
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/item/show/${params.id}`
      );
      if(data){
        setName(data.record.name);
        setCategory(data.record.category);
        setPrice(data.record.price);
        setDescription(data.record.description);
        setImage(data.record.image);
        setQuantity(data.record.quantity);
        setDiscount(data.record.discount);
        setId(data.record.item_id);
        
      }
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneProduct();
    // eslint-disable-next-line
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/item/update/${id}`,
        { name, description, price, image, quantity, category, discount }
      );

      if (data?.success) {
        toast.success("product updated successfully");
        setLoader(true)
        setTimeout(()=>{
          navigate("/dashboard/admin/products");
          setLoader(false)
        },1000)
        
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    }
  };

  // const handleDeleteProduct = async () => {
  //   try {
  //       let answer = window.confirm(`Are you sure you want to delete`);
  //       if (answer) {
  //         const { data } = await axios.delete(
  //           `${process.env.REACT_APP_API}/item/delete/${id}`
  //         );
  //       toast.success("Product deleted successfully");
  //       navigate("/dashboard/admin/products");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to delete product");
  //   }
  // };

  return (
    <>
      {loader && (
        <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />
      )}
      <Layout>
        <div className="page-width">
          <div className="container-fluid m-3 ">
            <div className="row align-items-start">
              <div className="col-md-3">
                <AdminMenu />
              </div>
              <div className="col-md-9 " style={{ paddingLeft: "30px" }}>
                <h2>Update Product </h2>
                <div className="m-1 w-75 ">
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    value={category}
                  >
                    {categories?.map((c) => (
                      <Option key={c.id} value={c.name}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={image}
                      placeholder="please enter image name"
                      className="form-control"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>

                  {image && (
                    <div
                      className="mb-3 image-preview-box"
                      style={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`/images/items-img/${image}`}
                        alt="preview img"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="write a description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="write a Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write a quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={discount}
                      placeholder="write a quantity"
                      className="form-control"
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 d-flex">
                    <div className="mb-3">
                      <button
                        className="btn btn-primary"
                        onClick={handleUpdateProduct}
                      >
                        Update Product
                      </button>
                    </div>
                    {/* <div className="mb-3 mx-3">
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteProduct}
                  >
                    Delete Product
                  </button>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
