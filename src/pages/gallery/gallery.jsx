import React, { useState, useEffect } from "react";
import "./gallery.css";
import { Breadcrumb, Table, Image } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, options, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import ModalDescription from "../../components/modalDescription/modalDescription";
import OptionModal from "../../components/optionModal/optionModal";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import { useDispatch } from "react-redux";
import ModalAddGallery from "../../components/updateGallery/modalAddGallery";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";



const Gallery = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");
  const [getProduct, setGetProduct] = useState(false);
  const getChallenges = () => {
    let getRes = (res) => {
      // console.log(111111,res?.data?.data[0].title);
      setProducts(res?.data?.data);
      // console.log('aaaaaaa',res?.data?.data[0].media);
      console.log("res of get games", res);
      // setShowModal(false);
    };

    callApi("GET", routes.getGallerys, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const DeleteProduct = (item) => {
    setGetProduct(false);
    let getRes = (res) => {
      console.log("deleting game");
      console.log("res of delete game", res);
      setGetProduct(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteGallery}/${item?._id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Photo/Video",
      dataIndex: "photo",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "center",
      className: "action-column-header",
    },
  ];
  //   Row Data
  const data = products.map((item, index) => {
    return {
      key: index,
      title: item?.title,
      type: item?.type,
      photo: (
        <div className="product-list-image">
        <Image width={60} src={item?.type === 'video' ? item?.thumbnail : item?.photo} />
      </div>      
      ),

      description: (
        <div>
          <p style={{ fontSize: "12px" }}>
            {item?.description.length > 10
              ? item?.description.substring(0, 30) + "..."
              : item?.description}{" "}
            <span
              onClick={() => {
                setShowModalDes(true);
                setPdescription(item?.description);
              }}
              style={{ color: "#34adf4", cursor: "pointer", fontWeight: 600 }}
            >
              {" "}
              See More{" "}
            </span>
          </p>
        </div>
      ),
      delete: (
        <div
          onClick={() => DeleteProduct(item)}
          className="server-roles-trash-btn"
        >
          <img src={redTrash} alt="" />
        </div>
      ),
      edit: (
        <div
          onClick={() => {
            setProduct(item);
            // dispatch(productItem(item));
            setShowModal(true);
            setAddProduct(false);
          }}
          className="product-list-edit-icon"
        >
          <img src={editIcon} />
        </div>
      ),
    };
  });

  useEffect(() => {
    getChallenges();
  }, [showModal, getProduct]);

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  return (
    <div className="admin-products-main-container">
      {showModal && (
        <ModalAddGallery
          showModal={showModal}
          setShowModal={setShowModal}
          item={product}
          setIsLoading={setIsLoading}
          addProduct={addProduct}
          setAddProduct={setAddProduct}
        />
      )}
      {showModalDes && (
        <DescriptionModal
          showModalDes={showModalDes}
          setShowModalDes={setShowModalDes}
          description={pDescription}
        />
      )}
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Gallery</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Games</h1>  
        <div
          onClick={() => {
            setAddProduct(true);
            setShowModal(true);
          }}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New Record</p>
        </div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default Gallery;
