import React, { useState, useRef } from "react";
import "./modalAddSchedule.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image, Select } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { RedNotify, upload } from "../../helper/helper";
const ModalAddSchedule = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [scheduleType, setscheduleType] = useState(addProduct ? "" : item?.scheduleType);
  const [startDay, setstartDay] = useState(addProduct ? "" : item?.startDay);
  const [endDay, setendDay] = useState(addProduct ? "" : item?.endDay);
  const [startTime, setstartTime] = useState(addProduct ? "" : item?.startTime);
  const [endTime, setendTime] = useState(addProduct ? "" : item?.endTime);

  

  const isFormIncomplete = () => {
    return (
      !scheduleType ||
      !startDay ||
      !endDay ||
      !startTime ||
      !endTime
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
      scheduleType,
      startDay,
      endDay,
      startTime, 
      endTime,
    };

    callApi(
      "POST",
      routes.createSchedule,
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
      startDay,
      endDay,
      startTime, 
      endTime,
    };

    callApi(
      "PATCH",
      `${routes.updateSchedule}/${item?._id}`,
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
          <h2>Schedule Type</h2>
          <Select
          defaultValue={scheduleType}
          disabled={!addProduct}
          style={{
            width: 100,
            marginLeft: "0rem",
          }}
          onChange={(e) => {
            setscheduleType(e);
            // console.log("onchange", { ...product, title: e.target.value });
            // setProduct({ ...product, title: e.target.value });
          }}
          options={[
            {
              value: "week",
              label: "Week",
            },
            {
              value: "day",
              label: "Day",
            },
          ]}
        />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Start Day</h2>
          <Input
            value={startDay}
            onChange={(e) => setstartDay(e.target.value)}
            placeholder="Monday etc"
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>End Day</h2>
          <Input
            value={endDay}
            onChange={(e) => setendDay(e.target.value)}
            placeholder="Saturday etc"
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Start Time</h2>
          <Input
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
            placeholder="10AM etc"
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>End Time</h2>
          <Input
            value={endTime}
            onChange={(e) => setendTime(e.target.value)}
            placeholder="7PM etc"
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
              Add Schedule
            </Button>
          ) : (
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

export default ModalAddSchedule;
