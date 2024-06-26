import React, { useState, useEffect } from "react";
import "./userList.css";
import { Breadcrumb, Button, Select, Table, Image } from "antd";
import { crossIcon, editIcon, homeIcon, redTrash, trueIcon } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";
import ModalUpdateUser from "../../components/ModalUpdateUser/modalUpdateUser";
import { GreenNotify } from "../../helper/helper";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [adduser, setAdduser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [getServiceapi, setGetServiceApi] = useState(false);
  const [user, setUser] = useState();
  const getAllUser = () => {
    let getRes = (res) => {
      console.log("res of user list", res);
      setUsers(res?.data?.data);
    };

    callApi("GET", routes.getAllUser, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const deleteService = (id) => {
    setGetServiceApi(false);
    let getRes = (res) => {
      console.log("res of deleteUser", res);
      GreenNotify("User/Guest is deleted successfully");
      setGetServiceApi(true);
      // setShowModal(false);
    };

    callApi(
      "DELETE",
      `${routes.deleteUser}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };


  useEffect(() => {
    getAllUser();
  }, [getServiceapi]);
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      className: "role-name-column-header",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      className: "role-name-column-header",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      className: "type-name-column-header",
      width: 400,
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      align: "center",
      className: "action-column-header",
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
      defaultFilteredValue: ["No"],
      onFilter: (value, record) => record.guest.indexOf(value) === 0,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
    },
  ];

  const data = users?.map((item, index) => {
    return {
      key: index,
      firstName: item?.firstname,
      lastName: item?.lastname,
      email: item?.isTemp ? "guest@novawaxing.com" : item?.email,
      dob: item?.isTemp ? "Guest" : moment(item?.dob).format("MM-DD-YYYY"),
      profilePicture:  item?.isTemp ? "Guest" : (
        <div className="product-list-image">
          <Image width={50} src={item?.image} alt="profile-image" />
        </div>
      ),
      verified: item?.isTemp ? "Guest" :  (
        <div className="server-roles-trash-btn">
          <img src={item?.verified ? trueIcon : crossIcon} alt="" />
        </div>
      ),
      guest: item?.isTemp ? "Yes" : "No",
      edit: (
        <div
          onClick={() => {
            setUser(item);
            // dispatch(productItem(item));
            setShowModal(true);
            setAdduser(false);
          }}
          className="product-list-edit-icon"
        >
          <img src={editIcon} />
        </div>
      ),
      delete: (
        <div
          onClick={() => deleteService(item?._id)}
          className="server-roles-trash-btn"
        >
          <img src={redTrash} alt="red-trash" />
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
        <ModalUpdateUser
          showModal={showModal}
          setShowModal={setShowModal}
          item={user}
          setIsLoading={setIsLoading}
          addProduct={adduser}
          setAddProduct={setAdduser}
        />
      )}
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>User List</h1> <div></div>
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

export default UserList;
