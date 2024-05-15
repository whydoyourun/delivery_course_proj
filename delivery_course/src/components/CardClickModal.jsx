// не юзаю пока думаю заменить из Menu.jsx модалку на отдельный компонент 
import { Modal } from 'antd';
import React from 'react';

const CardClickModal = ({ visible, content, onClose }) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null} centered>
      {content && (
        <div>
          {content}
        </div>
      )}
    </Modal>
  );
};

export default CardClickModal;



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
      <Button className="price-button" type="primary">
        Большая: <span className="price">${pizza.priceLarge}</span>
      </Button>
      <Button className="price-button">
        Стандартная: <span className="price">${pizza.priceStandard}</span>
      </Button>
    </>
  }
/>
</Card>