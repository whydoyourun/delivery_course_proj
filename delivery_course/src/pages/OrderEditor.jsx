import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const orders = [
  {
    id: 1,
    userId: 1,
    totalPrice: 150.75,
    status: 'pending',
    orderItems: [
      {
        id: 1,
        name: "пицца",
        price: 25.25,
        Order_Id: 1,
        menuItemId: 101,
        quantity: 2
      },
      {
        id: 2,
        name: "Салат",
        price: 20.00,
        Order_Id: 1,
        menuItemId: 105,
        quantity: 1
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    totalPrice: 90.50,
    status: 'shipped',
    orderItems: [
      {
        id: 3,
        name: "Гамбургер",
        price: 30.50,
        Order_Id: 2,
        menuItemId: 102,
        quantity: 3
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    totalPrice: 75.00,
    status: 'pending',
    orderItems: [
      {
        id: 4,
        name: "Суп",
        price: 15.00,
        Order_Id: 3,
        menuItemId: 103,
        quantity: 1
      },
      {
        id: 5,
        name: "Напиток",
        price: 10.00,
        Order_Id: 3,
        menuItemId: 104,
        quantity: 2
      }
    ]
  }
];

const OrderEditor = () => {
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [orderId, setOrderId] = useState('');

  const showModal = (order) => {
    setEditingOrder(order);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Сохранение обновленного заказа
    console.log('Saved order:', editingOrder);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddOrderItem = () => {
    const newOrderItem = {
      id: editingOrder.orderItems.length + 1,
      name: '',
      price: 0,
      Order_Id: editingOrder.id,
      menuItemId: '',
      quantity: 1
    };
    setEditingOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: [...prevOrder.orderItems, newOrderItem]
    }));
  };

  const handleRemoveOrderItem = (index) => {
    setEditingOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: prevOrder.orderItems.filter((_, i) => i !== index)
    }));
  };

  const handleFilterOrders = () => {
    if (orderId) {
      setFilteredOrders(orders.filter((order) => order.id === parseInt(orderId)));
    } else {
      setFilteredOrders(orders);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => `$${totalPrice.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Order Editor</h1>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Filter by order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button type="primary" onClick={handleFilterOrders}>
          Filter
        </Button>
      </div>
      <Table dataSource={filteredOrders} columns={columns} rowKey="id" />
      <Modal
        title="Edit Order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        {editingOrder && (
          <Form
            layout="vertical"
            initialValues={editingOrder}
            onFinish={handleOk}
          >
            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: 'Please input the user ID!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Total Price"
              name="totalPrice"
              rules={[{ required: true, message: 'Please input the total price!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select>
                <Option value="pending">Pending</Option>
                <Option value="shipped">Shipped</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Order Items">
              <div>
                <Button type="primary" onClick={handleAddOrderItem}>
                  Add Order Item
                </Button>
              </div>
              <Table
                dataSource={editingOrder.orderItems}
                columns={[
                  {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (name, record, index) => (
                      <Form.Item
                        name={`orderItems[${index}].name`}
                        rules={[{ required: true, message: 'Please input the item name!' }]}
                      >
                        <Input defaultValue={name} />
                      </Form.Item>
                    ),
                  },
                  {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    render: (price, record, index) => (
                      <Form.Item
                        name={`orderItems[${index}].price`}
                        rules={[{ required: true, message: 'Please input the item price!' }]}
                      >
                        <Input type="number" defaultValue={price} />
                      </Form.Item>
                    ),
                  },
                  {
                    title: 'Menu Item ID',
                    dataIndex: 'menuItemId',
                    key: 'menuItemId',
                    render: (menuItemId, record, index) => (
                      <Form.Item
                        name={`orderItems[${index}].menuItemId`}
                        rules={[{ required: true, message: 'Please input the menu item ID!' }]}
                      >
                        <Input type="number" defaultValue={menuItemId} />
                      </Form.Item>
                    ),
                  },
                  {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    render: (quantity, record, index) => (
                      <Form.Item
                        name={`orderItems[${index}].quantity`}
                        rules={[{ required: true, message: 'Please input the quantity!' }]}
                      >
                        <Input type="number" defaultValue={quantity} />
                      </Form.Item>
                    ),
                  },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, record, index) => (
                      <Button type="danger" onClick={() => handleRemoveOrderItem(index)}>
                        Remove
                      </Button>
                    ),
                  },
                ]}
                rowKey="id"
                pagination={false}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default OrderEditor;