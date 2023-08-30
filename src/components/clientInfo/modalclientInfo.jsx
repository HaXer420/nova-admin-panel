import React from "react";
import "./modalclientInfo.css";
import { redTrash } from "../../assets";

const ModalClientInfo = ({
  showModal,
  setShowModal,
  client
}) => {
  return (
    <div
      onClick={() => setShowModal(!showModal)}
      className="add-product-modal-main-container"
    >
      <div
        style={{ marginTop: "29rem", width: "90rem" }}
        className="add-product-modal-container"
      >
        <div className="description-modal-description-main-container">
        <h1>Client Information</h1>
              <h2>Name</h2>
              <p>{`${client?.firstname} ${client?.lastname}`}</p>
              <h2>Mobile No.</h2>
              <p>{client?.mobileno}</p>
              <h2>Email</h2>
              <p>{client?.email}</p>
              <h2>Address</h2>
              <p>{client?.address}</p>
              <h2>Comment</h2>
              <p>{client?.comment}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ModalClientInfo;
