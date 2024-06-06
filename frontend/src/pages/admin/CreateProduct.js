import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
const navigate = useNavigate()

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");

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


  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name)
      productData.append("price",price)
      productData.append("description",description)
      productData.append("image",image)
      productData.append("quantity",quantity)
      productData.append("category",category)
      // productData.append()

      console.log("data",{name,price,description,image,quantity,category,discount})
      console.log("productData" , productData);
      const {data} = await axios.post(`${process.env.REACT_APP_API}/item/add`,{name,price,description,image,quantity,category,discount})

      if(data?.success) {
        toast.success("product added successfully")
        navigate("/dashboard/admin/products")
      }
    } catch (error) {
      toast.error("Failed to add product")
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 ">
        <div className="row align-items-start">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Create Product </h2>
            <div className="m-1 w-75">
            <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
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
                  placeholder="write discount value"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
