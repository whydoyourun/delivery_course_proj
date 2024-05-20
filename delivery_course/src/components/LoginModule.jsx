import { Button, Input, Menu, Modal } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/LoginModuleStyle.css';

const LoginModal = ({ visible, onLogin, onRegister, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [hovered, setHovered] = useState(false);

  const handleSubmit = () => {
    if (isLoginMode) {
      onLogin(email, password);
    } else {
      onRegister(email, password);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <h2>{isLoginMode ? 'Войти' : 'Регистрация'}</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='login-modai-item'
      />
      <Input.Password
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='login-modai-item'
      />
      <Button type="primary" onClick={handleSubmit} className='login-modai-item'>
        {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
      </Button>
      <p
        onClick={toggleMode}
        className={`${hovered ? 'blue-text pointer-cursor' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLoginMode ? 'Нету аккаунта?' : 'Уже есть аккаунт?'}
      </p>
    </Modal>
  );
};

const LoginModule = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (email, password) => {
    // Здесь будет логика для аутентификации пользователя
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleRegister = (email, password) => {
    // Здесь будет логика для регистрации пользователя
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Menu.Item>
      {isLoggedIn ? (
        <Link to="/profile" className="profile-link">Профиль</Link>
      ) : (
        <Button onClick={toggleModal} className="login-button">Войти</Button>
      )}
      {!isLoggedIn && (
        <LoginModal
          visible={showModal}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onCancel={toggleModal}
        />
      )}
    </Menu.Item>
  );
};

export default LoginModule;