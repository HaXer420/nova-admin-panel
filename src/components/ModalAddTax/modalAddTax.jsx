import React, { useState, useRef } from "react";
import "./modalAddTax.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image, Select } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { RedNotify, upload } from "../../helper/helper";
const ModalAddTax = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [taxType, settaxType] = useState(addProduct ? "" : item?.taxType);
  const [taxPercentage, settaxPercentage] = useState(addProduct ? 0 : item?.taxPercentage);

  

  const isFormIncomplete = () => {
    return (
      !taxType ||
      !taxPercentage
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
      taxType: taxType,
      taxPercentage: taxPercentage,
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
      taxPercentage: taxPercentage,
    };

    callApi(
      "PATCH",
      `${routes.updateTax}/${item?._id}`,
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
          <h2>Tax Type</h2>
          <Select
          defaultValue={taxType}
          disabled={!addProduct}
          style={{
            width: 220,
            marginLeft: "2rem",
          }}
          onChange={(e) => {
            settaxType(e);
            // console.log("onchange", { ...product, title: e.target.value });
            // setProduct({ ...product, title: e.target.value });
          }}
          options={[
            {
              value: "Product",
              label: "Product",
            },
            {
              value: "Service",
              label: "Service",
            },
          ]}
        />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Tax</h2>
          <InputNumber
            value={taxPercentage}
            type="number"
            onChange={(e) => settaxPercentage(e)}
            min={0}
            placeholder="Tax Percentage"
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

export default ModalAddTax;
