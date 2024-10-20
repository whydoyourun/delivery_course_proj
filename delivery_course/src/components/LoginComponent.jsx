import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Menu, Modal, message } from "antd";
import "../style/LoginModuleStyle.css";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Импортируем компонент ForgotPasswordModal
import middleware from "../middleware/middleware";

const LoginModal = ({
  visible,
  onLogin,
  onRegister,
  onCancel,
  onForgotPassword,
}) => {
  // Добавляем пропс onForgotPassword
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h2>{isLoginMode ? "Войти" : "Регистрация"}</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-modai-item"
      />
      <Input.Password
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-modai-item"
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="login-modai-item"
        >
          {isLoginMode ? "Войти" : "Зарегистрироваться"}
        </Button>
        <Button
          type="link"
          className="login-modai-item"
          onClick={onForgotPassword}
        >
          {" "}
          {/* Добавляем onClick для вызова onForgotPassword */}
          Забыли пароль?
        </Button>
      </div>
      <p
        onClick={toggleMode}
        className={`${hovered ? "blue-text pointer-cursor" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLoginMode ? "Нету аккаунта?" : "Уже есть аккаунт?"}
      </p>
    </Modal>
  );
};

const LoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Добавляем состояние для отображения ForgotPasswordModal

  const handleLogin = async (email, password) => {
    try {
      const userData = {
        email,
        password,
      };
      await middleware.loginUser(userData);
      setIsLoggedIn(true);
      setShowModal(false);
      // Показываем сообщение об успешной авторизации
      message.success("Вы успешно вошли!");
    } catch (error) {
      console.error(error.message);
      // Показываем сообщение об ошибке авторизации
      message.error(`Ошибка авторизации: ${error.message}`);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const userData = {
        email,
        password,
      };
      await middleware.registerUser(userData);
      setIsLoggedIn(true);
      setShowModal(false);
      message.success("Вы успешно зарегестрировались!");
    } catch (error) {
      console.error(error.message);
      // Показываем сообщение об ошибке авторизации
      message.error(`Ошибка регистрации: ${error.message}`);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleForgotPasswordModal = () => {
    // Функция для отображения/скрытия ForgotPasswordModal
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  return (
    <Menu.Item>
      {localStorage.getItem("jwt") ? (
        <Link to="/profile" className="profile-link">
          Профиль
        </Link>
      ) : (
        <Button onClick={toggleModal} className="login-button">
          Войти
        </Button>
      )}
      {!localStorage.getItem("jwt") && (
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

export default LoginComponent;
