import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Modal,
  Table,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import middleware from "../middleware/middleware";

const { Content, Sider } = Layout;

const AdminMenuPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMenuItems = await middleware.fetchMenuItems();
      setData(fetchedMenuItems);
    };
    fetchData();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Normal Price", dataIndex: "price_normal", key: "price_normal" },
    { title: "Large Price", dataIndex: "price_large", key: "price_large" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Image", dataIndex: "image", key: "image" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.id)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedItem(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    // Implement delete logic here
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (selectedItem) {
        console.log("update");
        // Обновление существующего элемента
        setData(
          data.map((item) =>
            item.id === selectedItem.id ? { ...item, ...values } : item
          )
        );
        // Здесь можно добавить логику обновления в базе данных
      } else {
        console.log("Adding new item...");
        // Добавление нового элемента
        const newItem = await middleware.addMenuItem(
          values.name,
          values.description,
          values.price_normal,
          values.price_large,
          values.category,
          values.image
        );
        setData([...data, { ...newItem, id: data.length + 1 }]); // Используем данные из сервера
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Ошибка сохранения:", error.message);
      notification.error({
        message: "Error",
        description: "Пожалуйста, заполните все обязательные поля.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h1>Menu Administration</h1>
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            Add New Item
          </Button>
        </div>
        <Table dataSource={data} columns={columns} rowKey="id" />
        <Modal
          title={selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
          visible={isModalVisible}
          onOk={handleSave}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" name="menu_item_form">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="price_normal"
              label="Normal Price"
              rules={[
                { required: true, message: "Please input the normal price!" },
              ]}
            >
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item
              name="price_large"
              label="Large Price"
              rules={[
                { required: true, message: "Please input the large price!" },
              ]}
            >
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                { required: true, message: "Please input the category!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                { required: true, message: "Please input link to image!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AdminMenuPage;
