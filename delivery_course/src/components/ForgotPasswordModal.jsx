import { Button, Input, Modal, Form,message } from 'antd';
import React, { useState } from 'react';

const ForgotPasswordModal = ({ visible, onCancel }) => {
  const [email, setEmail] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [isSecretCodeValid, setIsSecretCodeValid] = useState(true);

  const handleSubmit = () => {
    // Здесь будет логика для отправки пароля на email
    setIsSentEmail(true);
  };

  const handleVerifyCode = () => {
    // Логика для проверки введённого секретного кода
    if (secretCode === '1234') {
      setIsSecretCodeValid(true);
      setShowNewPasswordForm(true);
    } else {
      setIsSecretCodeValid(false);
    }
  };

  const handleSaveNewPassword = () => {
    // Логика для сохранения нового пароля
    message.success('Пароль успешно изменен!');
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
      centered
    >
      {!isSentEmail ? (
        <>
          <h2>Забыли пароль?</h2>
          <p>Введите ваш email, и мы отправим вам инструкции по восстановлению пароля.</p>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-modal-item"
          />
          <Button type="primary" onClick={handleSubmit} className="login-modal-item">
            Отправить
          </Button>
        </>
      ) : !showNewPasswordForm ? (
        <>
          <h2>Введите секретный код</h2>
          <p>Мы отправили код на ваш email. Введите его ниже, чтобы восстановить пароль.</p>
          <Input
            placeholder="Секретный код"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            className={`login-modal-item ${!isSecretCodeValid ? 'error' : ''}`}
          />
          {!isSecretCodeValid && (
            <p className="error-message">Неверный секретный код</p>
          )}
          <Button type="primary" onClick={handleVerifyCode} className="login-modal-item">
            Подтвердить
          </Button>
        </>
      ) : (
        <>
          <h2>Введите новый пароль</h2>
          <Form layout="vertical">
            <Form.Item
              label="Новый пароль"
              name="newPassword"
              rules={[{ required: true, message: 'Пожалуйста, введите новый пароль' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-modal-item" onClick={handleSaveNewPassword}>
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};

const LoginModule = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  return (
    <div>
      <Button onClick={toggleModal} className="login-button">
        Войти
      </Button>
      <p
        onClick={toggleForgotPasswordModal}
        className="forgot-password-link"
      >
        Забыли пароль?
      </p>
      {showForgotPasswordModal && (
        <ForgotPasswordModal
          visible={showForgotPasswordModal}
          onCancel={toggleForgotPasswordModal}
        />
      )}
    </div>
  );
};

export default ForgotPasswordModal