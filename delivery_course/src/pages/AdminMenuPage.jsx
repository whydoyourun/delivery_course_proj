import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Layout, Menu, Modal, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';

const { Content, Sider } = Layout;

const AdminMenuPage = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Бургер с сыром',
      description: 'Бургер с котлетой, сыром и соусами',
      price_normal: 5.99,
      price_large: 7.99,
      category: 'Бургеры'
    },
    {
      id: 2,
      name: 'Салат Цезарь',
      description: 'Салат с курицей, пармезаном и фирменным соусом',
      price_normal: 8.99,
      price_large: 10.99,
      category: 'Салаты'
    },
    {
      id: 3,
      name: 'Пицца Маргарита',
      description: 'Тонкая пицца с соусом, моцареллой и базиликом',
      price_normal: 12.99,
      price_large: 15.99,
      category: 'Пицца'
    },
    {
      id: 4,
      name: 'Куриные крылышки',
      description: 'Острые куриные крылышки с соусом барбекю',
      price_normal: 7.99,
      price_large: 11.99,
      category: 'Закуски'
    },
    {
      id: 5,
      name: 'Паста Карбонара',
      description: 'Паста с беконом, сливками и пармезаном',
      price_normal: 9.99,
      price_large: 12.99,
      category: 'Паста'
    }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Можно загружать данные из базы данных здесь
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Normal Price', dataIndex: 'price_normal', key: 'price_normal' },
    { title: 'Large Price', dataIndex: 'price_large', key: 'price_large' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)} icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  const handleEdit = (record) => {
    setSelectedItem(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    // Также можно удалить из базы данных
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (selectedItem) {
        // Обновить существующий элемент
        setData(
          data.map((item) =>
            item.id === selectedItem.id ? { ...item, ...values } : item
          )
        );
        // Также можно обновить в базе данных
      } else {
        // Добавить новый элемент
        setData([...data, { ...values, id: data.length + 1 }]);
        // Также можно добавить в базу данных
      }
      setIsModalVisible(false);
    }).catch((error) => {
      notification.error({
        message: 'Error',
        description: 'Please fill in all required fields.',
      });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu mode="inline" defaultSelectedKeys={['menu']}>
          <Menu.Item key="menu">Menu</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h1>Menu Administration</h1>
            <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
              Add New Item
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            visible={isModalVisible}
            onOk={handleSave}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical" name="menu_item_form">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price_normal"
                label="Normal Price"
                rules={[{ required: true, message: 'Please input the normal price!' }]}
              >
                <InputNumber min={0} step={0.01} />
              </Form.Item>
              <Form.Item
                name="price_large"
                label="Large Price"
                rules={[{ required: true, message: 'Please input the large price!' }]}
              >
                <InputNumber min={0} step={0.01} />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please input the category!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminMenuPage;