import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Menu, Modal } from 'antd';
import '../style/LoginModuleStyle.css';
import ForgotPasswordModal from './ForgotPasswordModal'; // Импортируем компонент ForgotPasswordModal

const LoginModal = ({ visible, onLogin, onRegister, onCancel, onForgotPassword }) => { // Добавляем пропс onForgotPassword
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={handleSubmit} className='login-modai-item'>
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Button type="link" className='login-modai-item' onClick={onForgotPassword}> {/* Добавляем onClick для вызова onForgotPassword */}
          Забыли пароль?
        </Button>
      </div>
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
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Добавляем состояние для отображения ForgotPasswordModal

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

  const toggleForgotPasswordModal = () => { // Функция для отображения/скрытия ForgotPasswordModal
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  return (
    <Menu.Item>
      {isLoggedIn ? (
        <Link to="/profile" className="profile-link">Профиль</Link>
      ) : (
        <Button onClick={toggleModal} className="login-button">Войти</Button>
      )}
      {!isLoggedIn && (
        <>
          <LoginModal
            visible={showModal}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onCancel={toggleModal}
            onForgotPassword={toggleForgotPasswordModal} // Передаем функцию для открытия ForgotPasswordModal
          />
          {showForgotPasswordModal && ( // Показываем ForgotPasswordModal, если showForgotPasswordModal true
            <ForgotPasswordModal
              visible={showForgotPasswordModal}
              onCancel={toggleForgotPasswordModal}
            />
          )}
        </>
      )}
    </Menu.Item>
  );
};

export default LoginModule;
