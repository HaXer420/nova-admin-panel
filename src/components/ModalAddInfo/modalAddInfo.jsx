import React, { useState, useRef } from "react";
import "./modalAddInfo.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image, Select } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { RedNotify, upload } from "../../helper/helper";
const ModalAddInfo = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [contact, setcontact] = useState(addProduct ? "" : item?.contact);
  const [email, setemail] = useState(addProduct ? "" : item?.email);
  const [address, setaddress] = useState(addProduct ? "" : item?.address);

  

  const isFormIncomplete = () => {
    return (
      !contact ||
      !email ||
      !address 
    );
  };
  

  const createProduct = () => {
    let getRes = (res) => {
      console.log("res of create schedule", res);
      if (res.status === 400) {
        console.log("Check", res.message)
        return RedNotify(res.message);
      }
      setShowModal(false);
      setAddProduct(false);
    };

    let body = {
      contact,
      email,
      address,
    };

    callApi(
      "POST",
      routes.createInfo,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const updateProduct = () => {
    let getRes = (res) => {
      // console.log("res of update product", res);
      setShowModal(false);
    };

    let body = {
      contact,
      email,
      address,
    };

    callApi(
      "PATCH",
      `${routes.updateInfo}/${item?._id}`,
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
          <h2>Contact</h2>
          <Input
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Email</h2>
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email "
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Address</h2>
          <Input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="branch address etc"
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
          {addProduct ? (
            <Button
              onClick={createProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
              disabled={isFormIncomplete()}
            >
              Add Tax
            </Button>
          ) : (
            <Button
              onClick={updateProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
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

export default ModalAddInfo;
