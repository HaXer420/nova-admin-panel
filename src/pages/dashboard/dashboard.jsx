import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Breadcrumb, Button, Select, Table, Image } from "antd";
import {
  homeIcon,
  orderIcon1,
  productIcon,
  productIcon1,
  redTrash,
  reviewIcon,
  serviceIcon,
  serviceIcon1,
  serviceOrder,
  userIcon1,
} from "../../assets";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment/moment";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [isloading, setIsLoading] = useState(true);
  const [state, setState] = useState();

  const stateArr = [
    {
      title: "Total User",
      count: state?.allusers,
      icon: userIcon1,
    },
    {
      title: "Total Product",
      count: state?.products,
      icon: productIcon1,
    },
    {
      title: "Total Service",
      count: state?.services,
      icon: serviceIcon1,
    },
    {
      title: "Total Reviews",
      count: state?.globalreview,
      icon: userIcon1,
    },
    {
      title: "Product Order",
      count: state?.productorder,
      icon: orderIcon1,
    },
    {
      title: "Services Order",
      count: state?.serviceorder,
      icon: orderIcon1,
    },
  ];

  const getState = () => {
    let getRes = (res) => {
      setState(res);
      console.log("res of get state", res);
      // setShowModal(false);
    };

    callApi("GET", routes.getState, null, setIsLoading, getRes, (error) => {
      setState(error);
      //console.log("error", error);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getState();
  }, []);

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="dashboard-main-container">
        <div className="dashboard-state-container">
          {stateArr.map((item) => (
            <div className="dashboard-state-count-container">
              <div className="dashboard-state-icon">
                <img src={item.icon} alt="icon" />
              </div>
              <div className="dashboard-state">
                <h2>{item.title}</h2>
                <p>{item.count}</p>
              </div>
            </div>
          ))}

          {/* <div className="dashboard-state-count-container"></div> */}
        </div>
        <div className="dashboard-pie-chart-container">
          <Clock size={120} value={value} />
          <p>
            Current time:{" "}
            <span style={{ color: "red", fontWeight: "700" }}>
              {moment(new Date()).format("DD, MMM, YYYY , HH:mm A")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
