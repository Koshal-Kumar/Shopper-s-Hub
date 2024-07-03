import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/auth'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const [auth,setAuth]= useAuth()

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = auth.token;
        console.log("byn clicked")
        console.log(name,price,description,image,quantity)
      const res = await axios.post(`${process.env.REACT_APP_API}/item/add`, {
        name,price,description,image,quantity,token
      });
      if (res.data.sucess) {
        toast.success(res.data.msj);
        navigate("/home");
      } else {
        toast.error(res.data.msj);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="page-width">
      <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/about.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <p className="text-justify text-align-center mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          officiis obcaecati esse tempore unde ratione, eveniet mollitia,
          perferendis eius temporibus dicta blanditiis doloremque explicabo
          quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
          accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>
    </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
