import React from "react";
import { Button, Modal, Space, Spin } from "antd";

const Loader = ({ loading }) => {
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={loading}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      closeIcon={<div></div>}
    >
      <Spin size="large" />
      <h3>Loading..</h3>
    </Modal>
  );
};

export default Loader;
