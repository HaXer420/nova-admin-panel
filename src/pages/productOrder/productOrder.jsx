import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Select, Table, Image } from "antd";
import { crossIcon, homeIcon, redTrash, trueIcon } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment";
import ModalClientInfo from "../../components/clientInfo/modalclientInfo";

const ProductOrder = () => {
  const [bookedProducts, setBookedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const getAllProductBooked = () => {
    let getRes = (res) => {
      setBookedProducts(res?.productorder);
      console.log("res of booked order", res);
    };

    callApi(
      "GET",
      routes.allBookedProduct,
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
      title: "Client Name",
      dataIndex: "name",
      className: "role-name-column-header",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "right",
      className: "action-column-header",
      sorter: (a, b) =>
        moment(a.date, "DD-MM-YYYY").unix() -
        moment(b.date, "DD-MM-YYYY").unix(),
      // sorter: (a, b) => {
      //   console.log("date", a.date, moment(a.date, "DD-MM-YYYY").unix());
      // },
    },
    {
      title: "Client Image",
      dataIndex: "profileImage",
      className: "role-name-column-header",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      className: "type-name-column-header",
      //   width: 300,
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Order No.",
      dataIndex: "orderNo",
      align: "center",
      className: "action-column-header",
    },
     {
      title: "Client Info",
      dataIndex: "clientinfo",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Price",
      dataIndex: "Price",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      className: "action-column-header",

      filters: [
        {
          text: "Canceled",
          value: "canceled",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Shipped",
          value: "shipped",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Guest",
      dataIndex: "guest",
      align: "center",
      className: "action-column-header",
      filters: [
        {
          text: "Guest",
          value: "Yes",
        },
        {
          text: "User",
          value: "No",
        },
      ],
      onFilter: (value, record) => record.guest.indexOf(value) === 0,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "IsPaid",
      dataIndex: "ispaid",
      align: "center",
      className: "action-column-header",
    },
  ];

  const data = bookedProducts?.map((item) => {
    return {
      name: `${item?.user?.firstname} ${item?.user?.lastname} `,
      date: moment(item?.createdAt).format("DD-MM-YYYY"),
      profileImage: (
        <div className="product-list-image">
          <Image width={50} src={item?.user?.image} />
          {/* <img src={item?.user?.image} alt="profile-image" /> */}
        </div>
      ),
      email: item?.order?.client?.email,
      productName: item?.product?.title,
      orderNo: item?.order?.orderno,
      clientinfo: (
        <span
          onClick={() => {
            setShowModal(!showModal);
            setClient(item?.order?.client);
          }}
          style={{ color: "#34ADF4", cursor: "pointer" }}
        >
          See
        </span>
      ),
      Price: `$${item?.price}`,
      totalamount: `$${item?.amount}`,
      status: item?.status ? item?.status : "Old",
      guest: item?.user.isTemp ? "Yes" : "No",
      quantity: item?.quantity,
      ispaid: (
        <div className="server-roles-trash-btn">
          <img src={item?.order?.orderno ? trueIcon : crossIcon} alt="" />
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

  useEffect(() => {
    getAllProductBooked();
  }, []);
  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      {showModal && (
        <ModalClientInfo
          showModal={showModal}
          setShowModal={setShowModal}
          client={client}
        />
      )}
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Product Order List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Products Order</h1> <div></div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          dropdownPrefixCls="vall"
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default ProductOrder;
