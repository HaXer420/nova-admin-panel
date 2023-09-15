import { useState, useEffect } from "react";
import React from "react";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import { Breadcrumb, Button, Select, Image } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { Table } from "antd";
import moment from "moment";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";
import UpdateTax from "../../components/UpdateReview/UpdateReview";

const Reviews = () => {
  const [isloading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");
  const [getProduct, setGetProduct] = useState(false);
  const [product, setProduct] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const DeleteProduct = (item) => {
    setGetProduct(false);
    let getRes = (res) => {
      //console.log("res of delete product", res);
      setGetProduct(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteReviews}/${item?._id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const getReview = () => {
    let getRes = (res) => {
      setReviews(res?.data?.data);
      console.log("res of get review", res);
      // setShowModal(false);
    };

    callApi(
      "GET",
      routes.getallReviews,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };
  useEffect(() => getReview(), [showModal,getProduct]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "role-name-column-header",
    },
    {
      title: "Review",
      dataIndex: "review",
      align: "center",
      className: "type-name-column-header",
      width: 200,
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "right",
      className: "action-column-header",
    },
  ];

  const data = reviews?.map((item, index) => {
    return {
      key: index,
      name: item?.name,
      review: (
        <div>
          <p style={{ fontSize: "12px" }}>
            {item?.review.length > 10
              ? item?.review.substring(0, 30) + "..."
              : item?.review}{" "}
            <span
              onClick={() => {
                setShowModalDes(true);
                setPdescription(item?.review);
              }}
              style={{ color: "#34adf4", cursor: "pointer", fontWeight: 600 }}
            >
              {" "}
              See More{" "}
            </span>
          </p>
        </div>
      ),
      date: moment(item?.createdAt).format("DD MMM, YYYY"),
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

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      {showModal && (
        <UpdateTax
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
          headname={"Review"}
        />
      )}
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Reviews</Breadcrumb.Item>
      </Breadcrumb>

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

export default Reviews;
