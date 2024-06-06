import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import AdminMenu from "../../components/layouts/AdminMenu";
import CategoryForm from "../../components/layouts/Form/CategoryForm";
import { toast } from "react-toastify";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/category/create-category",
        { name }
      );
      if (data.success) {
        toast.success("category added successfully");
        setName("");
        getAllCategory();
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/category/update-category/${selected.id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somtihing went wrong");
    }
  };



  const handleDelete = async(id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/category/delete/${id}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  }
  return (
    <Layout>
      <div className="page-width">
      <div className="container-fluid m-3 p-3">
        <div className="row align-items-start">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="w-75 mx-5 p-3">
              <h2>Manage Categories</h2>
              <div className="p-3 w-50 ">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div>
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Categories</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr>
                        <>
                          <td key={c.id}> {c.name} </td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(c.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </Layout>
  );
};

export default CreateCategory;
