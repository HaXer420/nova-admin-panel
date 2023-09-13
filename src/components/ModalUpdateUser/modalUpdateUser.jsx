import React, { useState, useRef } from "react";
import "./modalUpdateUser.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image, Select } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { RedNotify, upload } from "../../helper/helper";
const ModalUpdateUser = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [firstname, setFirstname] = useState(addProduct ? "" : item?.firstname);
  const [lastname, setLastname] = useState(
    addProduct ? "" : item?.lastname
  );
  const [email, setEmail] = useState(addProduct ? 0 : item?.email);
  const [verified, setVerified] = useState(addProduct ? 0 : item?.verified);

  const isFormIncomplete = () => {
    return (
      !firstname ||
      !lastname ||
      !email || 
      !verified
    );
  };

  

  const dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";
  //console.log("add product", addProduct);


  const updateProduct = () => {
    let getRes = (res) => {
      // console.log("res of update product", res);
      setShowModal(false);
    };

    let body = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      verified: verified,
    };

    callApi(
      "PATCH",
      `${routes.updateUser}/${item?._id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };
  //   console.log("item", title1);
  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div style={{ marginTop: "5rem" }}></div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>First Name</h2>
          <Input
            value={firstname}
            placeholder="firstname"
            maxLength={25} // Set the maximum character limit
            onChange={(e) => {
              setFirstname(e.target.value);
              // console.log("onchange", { ...product, title: e.target.value });
              // setProduct({ ...product, title: e.target.value });
            }}
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Last Name</h2>
          <Input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="lastname"
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Email</h2>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Verified</h2>
          <Select
          defaultValue={verified ? "Yes" : "No"}
          style={{
            width: 100,
            marginLeft: "0rem",
          }}
          onChange={(e) => {
            setVerified(e);
            // console.log("onchange", { ...product, title: e.target.value });
            // setProduct({ ...product, title: e.target.value });
          }}
          options={[
            {
              value: "true",
              label: "Yes",
            },
            {
              value: "false",
              label: "No",
            },
          ]}
        />
        </div>
        <div className="modal-btn-container"></div>
        <div style={{ marginBottom: "3rem" }}>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            type="default"
            danger
          >
            Cancel
          </Button>
          { (
            <Button
              onClick={updateProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
              disabled={isFormIncomplete()}
            >
              UpDate
            </Button>
          )}
        </div>
      </div>
    </div>

    // <div className="add-product-modal-main-container">

    // </div>
  );
};

export default ModalUpdateUser;
