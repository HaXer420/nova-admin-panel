import React, { useRef, useState } from "react";
import "./addNewService.css";
import {
  Breadcrumb,
  Table,
  Input,
  Checkbox,
  Select,
  InputNumber,
  Button,
} from "antd";
import { homeIcon, redTrash } from "../../assets";
import { upload } from "../../helper/helper";
import Loader from "../../components/loader/loader";

const { TextArea } = Input;
const AddNewService = () => {
  const [isloading, setIsLoading] = useState(false);
  const [optionTitle, setOptionTitle] = useState("");
  const [title, setTitle] = useState("");
  const [des1Title, setDes1Title] = useState("");
  const [des1, setDes1] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(
    "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
  );
  const [image1, setImage1] = useState(
    "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
  );

  const pickImageFile = () => {
    fileInputRef.current.click();
  };
  const pickImageFile1 = () => {
    fileInputRef1.current.click();
  };
  const pickImageFile2 = () => {
    fileInputRef1.current.click();
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const addDescription = () => {
    let arr = [];
    arr = [...descriptions, { title: des1Title, description: des1 }];
    images.push(image1);
    setDescriptions(arr);
    setDes1Title("");
    setDes1("");
    setImage1("");
    console.log("arr", arr, images);
  };

  const addOption = () => {
    let arr = [];
    arr = [...options, { name: optionTitle, price: count }];
    setOptions(arr);
    setCount(0);
    setOptionTitle("");
  };

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Services</Breadcrumb.Item>
        <Breadcrumb.Item>Add new Service</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Add New Service</h1>
        <div></div>
      </div>
      <div className="add-service-input-main-container">
        <h3>Title</h3>:
        <Input
          value={title}
          onChange={setTitle}
          style={{ maxWidth: "50%", marginLeft: "2rem" }}
          placeholder="Basic usage"
        />
      </div>
      <div className="add-service-input-main-container">
        <h3>Special</h3>:{" "}
        <Checkbox
          style={{ maxWidth: "50%", marginLeft: "2rem" }}
          onChange={onChange}
        ></Checkbox>
      </div>
      <div className="add-service-input-main-container">
        <h3>Gender</h3>:{" "}
        <Select
          defaultValue="male"
          style={{
            width: 220,
            marginLeft: "2rem",
          }}
          onChange={handleChange}
          options={[
            {
              value: "male",
              label: "Male",
            },
            {
              value: "female",
              label: "Female",
            },
            {
              value: "other",
              label: "Other",
            },
          ]}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input
        onChange={upload((url) => setImage(url), setIsLoading)}
      />

      <input
        type="file"
        ref={fileInputRef1}
        style={{ display: "none" }} // Hide the file input
        onChange={upload((url) => setImage1(url), setIsLoading)}
      />

      <div className="add-service-input-main-container">
        <h3>Background Image</h3>:{" "}
        <div onClick={pickImageFile} className="add-service-back-ground-image">
          <img src={image} alt="image" />
        </div>
      </div>
      <div className="description-title-add-service">
        <h1>Description</h1>
      </div>

      <div className="add-service-option-main-container">
        <div style={{ width: "80%" }}>
          <div className="add-service-input-main-container">
            <h3>Title</h3>:
            <Input
              value={des1Title}
              onChange={(e) => setDes1Title(e.target.value)}
              style={{ maxWidth: "50%", marginLeft: "2rem" }}
              placeholder="Title "
            />
          </div>
          <div className="add-service-input-main-container">
            <h3>Description</h3>:
            <TextArea
              value={des1}
              onChange={(e) => setDes1(e.target.value)}
              rows={8}
              style={{ maxWidth: "50%", marginLeft: "2rem" }}
              placeholder="Description"
            />
          </div>
          <div className="add-service-input-main-container">
            <h3>Image</h3>:{" "}
            <div
              onClick={pickImageFile1}
              className="add-service-back-ground-image"
            >
              <img src={image1} alt="image1" />
            </div>
          </div>
        </div>

        <div className="add-cart-show-description-container">
          {descriptions.map((item) => (
            <div>
              <h1>{item.title}</h1>
              <p>{item?.description}</p>
            </div>
          ))}
          {images.map((item) => (
            <img src={item} alt="image" />
          ))}
        </div>
      </div>

      <div className="add-service-input-main-container">
        <Button onClick={addDescription} type="primary">
          {descriptions.length >= 1
            ? "Add More Description"
            : "Add Description"}
        </Button>
      </div>

      <div className="description-title-add-service">
        <h1>Options</h1>
      </div>

      <div className="add-service-option-main-container">
        <div style={{ width: "60%" }}>
          <div className="add-service-input-main-container">
            <h3>Name</h3>:
            <Input
              value={optionTitle}
              onChange={(e) => setOptionTitle(e.target.value)}
              style={{ maxWidth: "100%", marginLeft: "2rem" }}
              placeholder="Title for description"
            />
          </div>
          <div className="add-service-input-main-container">
            <h3>Price</h3>:
            <InputNumber
              style={{ marginLeft: "3rem", width: "100%" }}
              value={count}
              onChange={(e) => {
                setCount(e);
              }}
              prefix="$"
              min={0}
              placeholder="00.00"
            />
          </div>
          <div className="add-service-input-main-container">
            <Button onClick={addOption} type="primary">
              {options.length >= 1 ? "Add More Option" : "Add Option"}
            </Button>
          </div>
        </div>

        <div className="add-new-service-option-show-container">
          {options.length !== 0 ? (
            options.map((item) => (
              <div className="add-new-service-option-container">
                <h1>{item.name}</h1>
                <p>${item.price}</p>
              </div>
            ))
          ) : (
            <h1 style={{ color: "red" }}>No Option is add</h1>
          )}
        </div>
      </div>
      <div style={{ marginBottom: "5rem" }}></div>
    </div>
  );
};

export default AddNewService;
