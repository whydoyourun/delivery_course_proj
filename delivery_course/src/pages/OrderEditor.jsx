import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Modal, Form, Input } from 'antd';
import middleware from '../middleware/middleware';

const OrderEditor = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (selectedStatus !== null) {
      // Вызываем функцию перезагрузки страницы при изменении значения в selectedStatus
      window.location.reload();
    }
  }, [selectedStatus]);

  const loadOrders = async () => {
    try {
      const fetchedOrders = await middleware.fetchAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    }
  };

  const handleViewOrder = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await middleware.updateOrderStatus(orderId, newStatus);

      if (response.ok) {
        // Обновляем состояние заказов после успешного обновления статуса
        loadOrders();
      } else {
        throw new Error('Ошибка при обновлении статуса заказа');
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Пользователь', dataIndex: 'userId', key: 'userId' },
    { title: 'Общая стоимость', dataIndex: 'totalPrice', key: 'totalPrice' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleViewOrder(record)}>Просмотреть</Button>
          <Select
            value={record.status} // Значение должно быть установлено равным текущему статусу заказа
            onChange={(newStatus) => {
              setSelectedStatus(newStatus);
              handleUpdateStatus(record.id, newStatus);
            }}
          >
            <Select.Option value="Готовится">Готовится</Select.Option>
            <Select.Option value="В обработке">В обработке</Select.Option>
            <Select.Option value="Завершен">Завершен</Select.Option>
            <Select.Option value="Отменен">Отменен</Select.Option>
          </Select>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={orders} columns={columns} rowKey="id" />
      <Modal
        title="Заказ"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <Form layout="vertical">
            <Form.Item label="ID заказа">{selectedOrder.id}</Form.Item>
            <Form.Item label="Пользователь">{selectedOrder.userId}</Form.Item>
            <Form.Item label="Общая стоимость">{selectedOrder.totalPrice}</Form.Item>
            <Form.Item label="Статус">{selectedOrder.status}</Form.Item>
            <Form.Item label="Способ оплаты">{selectedOrder.paymentMethod}</Form.Item>
            <Form.Item label="Способ доставки">{selectedOrder.shippingMethod}</Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default OrderEditor;
