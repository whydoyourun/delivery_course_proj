import { Button, Card, Col, Divider, Modal, Radio, Row, Typography, message } from 'antd';
import React, { useState } from 'react';
import '../style/menuStyle.css';
import middleware from '../middleware/middleware';

const { Title, Text } = Typography;

const Menu = ({ pizzas, menuName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState('standard');

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddToCart = (pizza, size) => {
    try {
      const resultId = size === 'standard' ? pizza.id : `${pizza.id}-large`;
      middleware.addItemToCart(resultId);
      message.success('Товар успешно добавлен');
    } catch (e) {
      message.error('Ошибка добавления товара');
      console.log(e);
    }
  };

  return (
    <div>
      <Divider orientation="left">
        <Title level={10} className="menu-header">
          {menuName}
        </Title>
      </Divider>
      <div className="menu-content">
        <Row gutter={[16, 16]}>
          {pizzas.map((pizza) => (
            <Col key={pizza.name} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={pizza.name} src={pizza.image} />}
                className="pizza-card"
                onClick={() => handlePizzaClick(pizza)}
              >
                <Card.Meta
                  description={
                    <>
                      <h3 className="menu-title">{pizza.name}</h3>
                      <h2 className="item-description">{pizza.description}</h2>
                      <Button
                        className="price-button"
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation(); // Остановить всплытие события клика
                          handleAddToCart(pizza, 'large');
                        }}
                      >
                        Большая: <span className="price">{pizza.price_large}р.</span>
                      </Button>
                      <Button
                        className="price-button"
                        onClick={(e) => {
                          e.stopPropagation(); // Остановить всплытие события клика
                          handleAddToCart(pizza, 'standard');
                        }}
                      >
                        Стандартная: <span className="price">{pizza.price_normal}р.</span>
                      </Button>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal visible={modalVisible} onCancel={handleModalClose} footer={null} centered>
        {selectedPizza && (
          <div>
            <h2>{selectedPizza.name}</h2>
            <img alt={selectedPizza.name} src={selectedPizza.image} className="modal-image" />
            <p>{selectedPizza.description}</p>
            <Radio.Group value={selectedSize} onChange={handleSizeChange}>
              <Radio.Button value="standard">Стандартная</Radio.Button>
              <Radio.Button value="large">Большая</Radio.Button>
            </Radio.Group>
            <Button
              className="modal-price-button"
              type="primary"
              onClick={() =>
                handleAddToCart(selectedPizza, selectedSize)
              }
            >
              Добавить в корзину{' '}
              <span className="price">
                {selectedSize === 'standard'
                  ? selectedPizza.price_normal
                  : selectedPizza.price_large}
                р.
              </span>
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Menu;