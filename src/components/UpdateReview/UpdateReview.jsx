import React, { useState, useRef } from "react";
import "./UpdateReview.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image, Select } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { RedNotify, upload } from "../../helper/helper";
const UpdateTax = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [name, setName] = useState(addProduct ? "" : item?.name);
  const [review, setReview] = useState(addProduct ? "0" : item?.review);

  

  const isFormIncomplete = () => {
    return (
      !name ||
      !review
    );
  };
  

  const createProduct = () => {
    let getRes = (res) => {
      console.log("res of create product", res);
      if (res.status === 400) {
        console.log("Check", res.message)
        return RedNotify(res.message);
      }
      setShowModal(false);
      setAddProduct(false);
    };

    let body = {
      name: name,
      review: review,
    };

    callApi(
      "POST",
      routes.createTax,
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
      name: name,
      review: review,
    };

    callApi(
      "PATCH",
      `${routes.updateReviews}/${item?._id}`,
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
          <h2>Name</h2>
          <Input
            value={name}
            placeholder="Name"
            maxLength={25}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Review</h2>
          <Input
            value={review}
            placeholder="Review"
            // maxLength={25}
            onChange={(e) => {
              setReview(e.target.value);
            }}
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

export default UpdateTax;
