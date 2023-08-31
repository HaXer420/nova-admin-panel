import React from "react";
import "./description.css";

const DescriptionModal = ({ showModalDes, setShowModalDes, description, headname }) => {
  return (
    <div
      onClick={() => setShowModalDes(false)}
      className="add-product-modal-main-container"
    >
      <div
        style={{ marginTop: "29rem", width: "70rem" }}
        className="add-product-modal-container product-description-detail"
      >
        <h1>{headname}</h1>
        <h2>{description}</h2>
      </div>
    </div>
  );
};

export default DescriptionModal;
