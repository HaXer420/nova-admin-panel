import React, { useState, useRef } from "react";
import "./modalAddGallery.css";
import { Button, Modal, Select, Input, InputNumber, Checkbox, Image } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { upload } from "../../helper/helper";
import Resumable from 'resumablejs';

const ModalAddGallery = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [title, setTitle] = useState(addProduct ? "" : item?.title);
  const [type, setType] = useState(addProduct ? "" : item?.type);
  const [description, setDescription] = useState(addProduct ? '' : item?.description);
  const [image, setImage] = useState(addProduct ? "" : item?.photo);
  const [thumbnail, setThumbnail] = useState(addProduct ? "" : item?.thumbnail);
  const [showThumbnailInput, setShowThumbnailInput] = useState(type === "photo");

  const { Option } = Select;
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);

  const dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  };

  const pickImageFile = () => {
    fileInputRef.current.click();
  };
  const pickImageFile1 = () => {
    fileInputRef1.current.click();
  };

  const handleAddButtonClick = () => {
    createProduct();
  };

  const createProduct = () => {
    const getRes = (res) => {
      console.log("res of create product", res);
      setShowModal(false);
      setAddProduct(false);
    };

    const body = {
      title: title,
      description: description,
      type: type,
      photo: image,
      thumbnail: thumbnail,
    };

    console.log('body',body.photo); 

    callApi(
      "POST",
      routes.createGallery,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const updateProduct = () => {
    const getRes = (res) => {
      setShowModal(false);
    };

    const body = {
      title: title,
      description: description,
      type: type,
      photo: image,
      thumbnail: thumbnail,
    };

    callApi(
      "PATCH",
      `${routes.upDateGallery}/${item?._id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div style={{ marginTop: "2rem" }}></div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Title</h2>
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Description</h2>
          <Input
            value={description}
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Media Type</h2>
          <Select
            value={type}
            style={{ width: "100%" }}
            onChange={(value) => {
              setType(value);
              // Toggle the Thumbnail input based on the selected value
              setShowThumbnailInput(value === "photo");
            }}
            placeholder="Please select a media type"
          >
            <Option value="photo" selected>Photo</Option>
            <Option value="video">Video</Option>
          </Select>
        </div>

        {type === "video" && (
  <>
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={upload((url) => setImage(url), setIsLoading)}
    />
    <div
      onClick={() => pickImageFile(fileInputRef)}
      style={{ marginBottom: "2rem" }}
      className="add-product-modal-input-title"
    >
      <h2>Video</h2>
      <div className="add-product-modal-image">
        <img src={image ? image : dummyImage} alt="" />
      </div>
    </div>

    <input
      type="file"
      ref={fileInputRef1}
      style={{ display: "none" }}
      onChange={upload((url) => setThumbnail(url), setIsLoading)}
    />
    <div
      onClick={() => pickImageFile(fileInputRef1)}
      style={{ marginBottom: "2rem" }}
      className="add-product-modal-input-title"
    >
      <h2>Thumbnail</h2>
      <div className="add-product-modal-image">
        <img src={thumbnail ? thumbnail : dummyImage} alt="" />
      </div>
    </div>
  </>
)}

{type === "photo" && (
  <>
  <input
    type="file"
    ref={fileInputRef}
    style={{ display: "none" }}
    onChange={upload((url) => setImage(url), setIsLoading)}
  />
  <div
    onClick={() => pickImageFile(fileInputRef)}
    style={{ marginBottom: "2rem" }}
    className="add-product-modal-input-title"
  >
    <h2>Photo</h2>
    <div className="add-product-modal-image">
      <img src={image ? image : dummyImage} alt="" />
    </div>
  </div>
  </>
)}


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
              onClick={handleAddButtonClick}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={updateProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAddGallery;
