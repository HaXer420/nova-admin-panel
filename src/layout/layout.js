import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { homeIcon, productIcon, redTrash, serviceIcon } from "../assets";
import "./layout.css";
import Header2 from "../components/header/header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Products from "../pages/products/products";
import { useDispatch } from "react-redux";
import { accessToken, refreshToken, userData } from "../redux/userDataSlice";
import { useToken } from "antd/es/theme/internal";
import Services from "../pages/services/services";
import AddNewService from "../pages/addNewService/addNewService";

const { Header, Content, Footer, Sider } = Layout;
const LayoutDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userData(null));
    dispatch(accessToken(""));
    dispatch(refreshToken(""));
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider style={{ background: "#0B1B2D" }} width={280}>
        <div
          style={{
            padding: "2rem 0",
            textAlign: "center",
            color: "white",
            fontSize: "3rem",
          }}
        >
          Logo
        </div>
        <Menu
          style={{ marginTop: "2rem" }}
          inlineCollapsed={true}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          // items={itemsMain}
        >
          <Menu.Item
            onClick={() => navigate("/products")}
            icon={<img className="side-bar-icon" src={productIcon} />}
            key="90"
          >
            Products
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/services")}
            icon={<img className="side-bar-icon" src={serviceIcon} />}
            key="92"
          >
            Services
          </Menu.Item>
          <Menu.Item onClick={logOut} key="89">
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header2 />
        <Content
          style={{
            background: "#fff",
          }}
        >
          <Routes>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/new-service" element={<AddNewService />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
