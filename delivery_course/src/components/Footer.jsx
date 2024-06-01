import { Col, Divider, Row, Typography } from 'antd';
import React from 'react';

import emailIcon from '../static/icons/email-icon.png';
import facebookIcon from '../static/icons/facebook-icon.png';
import instagramIcon from '../static/icons/instagram-icon.png';
import locationIcon from '../static/icons/location-icon.png';
import phoneIcon from '../static/icons/phone-icon.png';
import vkIcon from '../static/icons/vk-icon.png';

import '../style/footerStyle.css';

const { Title, Text } = Typography;

const Footer = () => {
  return (
    <div className="footer-container" >
      <div className="footer-content" >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="footer-section">
              <Title level={4} className="footer-section-title">
                О нас
              </Title>
              <Text>
                Мы компания, занимающаяся производством и доставкой пиццы высочайшего качества. Вкусная пицца — наша страсть!
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="footer-section">
              <Title level={4} className="footer-section-title">
                Контакты
              </Title>
              <ul className="footer-contact-list">
                <li>
                  <img src={phoneIcon} alt="Phone Icon" className="icon-image" />
                  <span>+7 123 456 789</span>
                </li>
                <li>
                  <img src={emailIcon} alt="Email Icon" className="icon-image" />
                  <span>info@example.com</span>
                </li>
                <li>
                  <img src={locationIcon} alt="Location Icon" className="icon-image" />
                  <span>Адрес</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="footer-section">
              <Title level={4} className="footer-section-title">
                Социальные сети
              </Title>
              <ul className="footer-social-media-list">
                <li>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook Icon" className="icon-image" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram Icon" className="icon-image" />
                  </a>
                </li>
                <li>
                  <a href="https://www.vk.com/dodo" target="_blank" rel="noopener noreferrer">
                    <img src={vkIcon} alt="vk Icon" className="icon-image" />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="footer-section">
              <Title level={4} className="footer-section-title">
                Полезные ссылки
              </Title>
              <ul className="footer-link-list">
                <li>
                  <a >О компании</a>
                </li>
                <li>
                  <a >Меню</a>
                </li>
                <li>
                  <a >Доставка и оплата</a>
                </li>
                <li>
                  <a >Контакты</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="footer-bottom">
        <Text>© 2024 Наша Пицца. Все права защищены.</Text>
      </div>
    </div>
  );
};

export default Footer;