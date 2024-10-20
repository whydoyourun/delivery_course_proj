import React, { useState } from "react";
import { Modal, Image, Tooltip } from "antd";

const ImageCard = ({ thumbnail, fullImage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Tooltip title="Подробнее" placement="bottom">
      <div
        style={{
          width: "200px",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Параметры анимации
        }}
        onClick={showModal}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; // Увеличение при наведении
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Возврат к нормальному размеру
        }}
      >
        <Image
          src={thumbnail}
          alt="Thumbnail"
          preview={false}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px", // Закругленные углы
          }}
        />
        <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
          <Image src={fullImage} alt="Full Size" style={{ width: "100%" }} />
        </Modal>
      </div>
    </Tooltip>
  );
};

export default ImageCard;
