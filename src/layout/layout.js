import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  homeIcon,
  logOutIcon,
  productIcon,
  productIcon1,
  productOrder,
  redTrash,
  reviewIcon,
  serviceIcon,
  serviceOrder,
  userIcon,
} from "../assets";
import "./layout.css";
import Header2 from "../components/header/header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Products from "../pages/products/products";
import { useDispatch } from "react-redux";
import { accessToken, refreshToken, userData } from "../redux/userDataSlice";
import { useToken } from "antd/es/theme/internal";
import Services from "../pages/services/services";
import AddNewService from "../pages/addNewService/addNewService";
import Gallery from "../pages/gallery/gallery";
import UpdateService from "../pages/updateService/updateService";
import UserList from "../pages/userList/userList";
import ProductOrder from "../pages/productOrder/productOrder";
import ServiceOrder from "../pages/serviceOrder/serviceOrder";
import { callApi } from "../api/apiCaller";
import routes from "../api/routes";
import { useState } from "react";
import Loader from "../components/loader/loader";
import { GreenNotify, RedNotify } from "../helper/helper";
import Dashboard from "../pages/dashboard/dashboard";
import Reviews from "../pages/Reviews/reviews";
import Tax from "../pages/tax/tax";
import Schedule from "../pages/schedule/schedule";
import Info from "../pages/info/info";

const { Header, Content, Footer, Sider } = Layout;
const LayoutDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    let getRes = (res) => {
      if (res.status == 200) {
        GreenNotify(res.message);
        dispatch(userData(null));
        dispatch(accessToken(""));
        dispatch(refreshToken(""));
      } else {
        RedNotify(res.message);
      }
    };

    let body = {
      device: {
        id: localStorage.getItem("deviceId"),
        deviceToken: "xyz",
      },
    };

    callApi("POST", routes.logOut, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Loader loading={isloading} />
      <Sider style={{ background: "#0B1B2D" }} width={280}>
        <div
          onClick={() => navigate("/")}
          style={{
            padding: "2rem 0",
            textAlign: "center",
            color: "white",
            fontSize: "3rem",
            cursor: "pointer",
          }}
        >
          NOVA
        </div>
        <Menu
          style={{ marginTop: "5rem" }}
          inlineCollapsed={true}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          // items={itemsMain}
        >
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/products")}
            icon={<img className="side-bar-icon" src={productIcon} />}
            key="90"
          >
            Products
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/services")}
            icon={<img className="side-bar-icon" src={serviceIcon} />}
            key="92"
          >
            Services
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/gallery")}
            icon={<img className="side-bar-icon" src={serviceIcon} />}
            key="20"
          >
            Gallery
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/user-list")}
            icon={<img className="side-bar-icon" src={userIcon} />}
            key="95"
          >
            Users
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/products-order-list")}
            icon={<img className="side-bar-icon" src={productOrder} />}
            key="99"
          >
            Product Orders
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/services-order-list")}
            icon={<img className="side-bar-icon" src={serviceOrder} />}
            key="105"
          >
            Service Orders
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/reviews-list")}
            icon={<img className="side-bar-icon" src={reviewIcon} />}
            key="108"
          >
            Reviews
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/tax-list")}
            icon={<img className="side-bar-icon" src={serviceOrder} />}
            key="109"
          >
            Tax
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/schedule-list")}
            icon={<img className="side-bar-icon" src={serviceIcon} />}
            key="110"
          >
            Schedule
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/info-list")}
            icon={<img className="side-bar-icon" src={productIcon} />}
            key="111"
          >
            Info
          </Menu.Item>
          <Menu.Item
            style={{ marginTop: "5rem" }}
            icon={<img className="side-bar-icon" src={logOutIcon} />}
            onClick={logOut}
            key="89"
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            background: "#fff",
            paddingTop: "2rem",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/new-service" element={<AddNewService />}></Route>
            <Route path="/update-service" element={<UpdateService />}></Route>
            <Route path="/user-list" element={<UserList />}></Route>
            <Route path="/reviews-list" element={<Reviews />}></Route>
            <Route path="/tax-list" element={<Tax />}></Route>
            <Route path="/schedule-list" element={<Schedule />}></Route>
            <Route path="/info-list" element={<Info />}></Route>
            <Route
              path="/products-order-list"
              element={<ProductOrder />}
            ></Route>
            <Route
              path="/services-order-list"
              element={<ServiceOrder />}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
