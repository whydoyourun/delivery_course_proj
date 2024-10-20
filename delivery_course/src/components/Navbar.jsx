import React from "react";

import {
  Typography,
  Button,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  message,
  Radio,
  Divider,
} from "antd";

const Navbar = () => {
  return (
    <Menu
      className="custom-menu"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      onClick={({ key }) => handleMenuClick(key)}
    >
      <Menu.Item key="1">Пицца</Menu.Item>
      <Menu.Item key="2">Бургеры</Menu.Item>
      <Menu.Item key="3">Закуски</Menu.Item>
      <Menu.Item key="4">Дессерты</Menu.Item>
      <Menu.Item key="5">Напитки</Menu.Item>
      <Menu.Item key="7">
        {" "}
        <Input
          placeholder="Название продукта"
          value={filterr}
          onChange={(e) => setFilterr(e.target.value)}
          style={{ width: 200, marginTop: 10 }}
        />
      </Menu.Item>
      <Menu.Item
        key="6"
        style={{ marginLeft: "auto", fontSize: "24px" }}
        onClick={handleCartClick}
      >
        Корзина
      </Menu.Item>
      <Menu.Item
        onClick={handlePhoneMenuItemClick}
        style={{ fontSize: "20px" }}
      >
        +7 (123) 456-7890
      </Menu.Item>
      <LoginComponent isLoggedIn={false} />{" "}
    </Menu>
  );
};

export default Navbar;
