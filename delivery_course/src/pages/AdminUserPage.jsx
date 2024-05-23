import { FilterFilled } from '@ant-design/icons';
import { Input as AntdInput, Button, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';

// Sample user data in JSON format
const sampleUserData = [
  {
    id: 1,
    email: 'user1@example.com',
    name: 'User 1',
    password: 'password1',
    role: 'ADMIN',
    phoneNumber: '1234567890'
  },
  {
    id: 2,
    email: 'user2@example.com',
    name: 'User 2',
    password: 'password2',
    role: 'USER',
    phoneNumber: '0987654321'
  },
  // Add more sample user data as needed
];

const AdminUserPage = () => {
  const [users, setUsers] = useState(sampleUserData);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    email: '',
    name: '',
    role: '',
    phoneNumber: '',
  });

  const showModal = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Update the user data in the state
    const updatedUsers = users.map((u) => (u.id === editingUser.id ? editingUser : u));
    setUsers(updatedUsers);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (field, value) => {
    setEditingUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleFilter = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const filteredUsers = users.filter((user) =>
    user.email.includes(filters.email) &&
    user.name.includes(filters.name) &&
    user.role.includes(filters.role) &&
    user.phoneNumber.includes(filters.phoneNumber)
  );

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <AntdInput
            placeholder="Filter by email"
            value={filters.email}
            onChange={(e) => handleFilter('email', e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: 8 }}
            onClick={() => handleFilter('email', filters.email)}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? '#1890ff' : '#aaa' }} />
      ),
      onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <AntdInput
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => handleFilter('name', e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: 8 }}
            onClick={() => handleFilter('name', filters.name)}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? '#1890ff' : '#aaa' }} />
      ),
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <AntdInput
            placeholder="Filter by role"
            value={filters.role}
            onChange={(e) => handleFilter('role', e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: 8 }}
            onClick={() => handleFilter('role', filters.role)}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? '#1890ff' : '#aaa' }} />
      ),
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <AntdInput
            placeholder="Filter by phone number"
            value={filters.phoneNumber}
            onChange={(e) => handleFilter('phoneNumber', e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: 8 }}
            onClick={() => handleFilter('phoneNumber', filters.phoneNumber)}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? '#1890ff' : '#aaa' }} />
      ),
      onFilter: (value, record) => record.phoneNumber.includes(value),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <Button onClick={() => showModal(user)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Edit User</h1>
      <Table dataSource={filteredUsers} columns={columns} rowKey="id" />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {editingUser && (
          <Form>
            <Form.Item label="Email">
              <Input
                value={editingUser.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Name">
              <Input
                value={editingUser.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                value={editingUser.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Role">
              <Input
                value={editingUser.role}
                onChange={(e) => handleChange('role', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input
                value={editingUser.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AdminUserPage;