import React, { useState, useRef } from "react";
import "./modalAddGallery.css";
import {
  Button,
  Modal,
  Select,
  Input,
  InputNumber,
  Checkbox,
  Image,
} from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { upload } from "../../helper/helper";
import FadeLoader from "react-spinners/FadeLoader";
import { GreenNotify, RedNotify } from "../../helper/helper";

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
  const [description, setDescription] = useState(
    addProduct ? "" : item?.description
  );
  const [image, setImage] = useState(addProduct ? "" : item?.photo);
  const [thumbnail, setThumbnail] = useState(addProduct ? "" : item?.thumbnail);
  const [loader, setLoader] = useState(false);
  const [showThumbnailInput, setShowThumbnailInput] = useState(
    type === "photo"
  );


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

  const getRes = (res) => {
    console.log("res of create product", res);
    setShowModal(false);
    setAddProduct(false);
  };

  const isFormIncomplete = () => {
    return (
      !title ||
      !description ||
      !image
    );
  };

  const createProduct = () => {
    let body = {
      title: title,
      description: description,
      type: type,
      photo: image,
      thumbnail: thumbnail,
    };

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
            <Option value="photo" selected>
              Photo
            </Option>
            <Option value="video">Video</Option>
          </Select>
        </div>

        {type === "video" && (
          <>
          <input
  type="file"
  ref={fileInputRef}
  style={{ display: "none" }}
  accept="image/*, video/*" // Accept only image and video file types
  onChange={(e) => {
    setLoader(true);

    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWJmZDdhMGQ4YzRjODhiMzc0MDQ3YyIsImlhdCI6MTY3OTU1NjEwNn0.2j-EGacy-8AKMS6ukSlwl_irW0h7PPNWha52TTWTM54"
      );

      var formdata = new FormData();
      formdata.append("file", selectedFile);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://rxje2xzpme.us-east-1.awsapprunner.com/api/v1/user/upload", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setImage(result.url);
          setLoader(false);

          // Set the video source to the selected video
          const videoElement = document.getElementById("videoPreview");
          if (videoElement) {
            videoElement.src = result.url;
            videoElement.load(); // Load and play the video
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      // Handle invalid file type
      console.log("Invalid file type. Please select an image or video.");
      setLoader(false);
      RedNotify("Invalid file type. Please select an image or video.");
    }
  }}
/>

            {/* <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                setLoader(true)

                var myHeaders = new Headers();
                myHeaders.append(
                  "Authorization",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWJmZDdhMGQ4YzRjODhiMzc0MDQ3YyIsImlhdCI6MTY3OTU1NjEwNn0.2j-EGacy-8AKMS6ukSlwl_irW0h7PPNWha52TTWTM54"
                );

                var formdata = new FormData();
                formdata.append("file", e.target.files[0]);

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: formdata,
                  redirect: "follow",
                };

                fetch("https://rxje2xzpme.us-east-1.awsapprunner.com/api/v1/user/upload", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  setImage(result.url);
                  setLoader(false)

          
                  // Set the video source to the selected video
                  const videoElement = document.getElementById("videoPreview");
                  if (videoElement) {
                    videoElement.src = result.url;
                    videoElement.load(); // Load and play the video
                  }
                })
                .catch((error) => console.log("error", error));
              }}
            /> */}
            <div
              onClick={() => pickImageFile(fileInputRef)}
              style={{ marginBottom: "2rem" }}
              className="add-product-modal-input-title"
            >
              <h2>Video</h2>
              <div className="add-product-modal-image">
  {loader ? (
    <div className="loader"></div>
  ) : image ? (
    <video width={150} height={150} src={image} alt="" controls />
  ) : (
    <img src={dummyImage} alt="" />
  )}
</div>

            </div>
            <input
              type="file"
              ref={fileInputRef1}
              style={{ display: "none" }}
              onChange={(e) => {

                const selectedFile = e.target.files[0];

                if (selectedFile && selectedFile.type.startsWith("image/")) {

                var myHeaders = new Headers();
                myHeaders.append(
                  "Authorization",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWJmZDdhMGQ4YzRjODhiMzc0MDQ3YyIsImlhdCI6MTY3OTU1NjEwNn0.2j-EGacy-8AKMS6ukSlwl_irW0h7PPNWha52TTWTM54"
                );

                var formdata = new FormData();
                formdata.append("file", e.target.files[0]);

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: formdata,
                  redirect: "follow",
                };

                fetch(
                  "https://rxje2xzpme.us-east-1.awsapprunner.com/api/v1/user/upload",
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => setThumbnail(result.url))
                  //  console.log(result))
                  .catch((error) => console.log("error", error));

                } else {
                  // Handle invalid file type
                  console.log("Invalid file type. Please select an image or video.");
                  setLoader(false);
                  RedNotify("Invalid file type. Please select an image");
                }
              }}
            />
            <div
              onClick={() => pickImageFile1(fileInputRef1)}
              style={{ marginBottom: "2rem" }}
              className="add-product-modal-input-title"
            >
              <h2>Thumbnail</h2>
              <div className="add-product-modal-image">
                {/* <img src={dummyImage} alt="" /> */}
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
              onChange={(ev) =>
                upload((url) => setImage(url), setIsLoading)(ev.target.files)
              }
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
              disabled={isFormIncomplete()}
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




