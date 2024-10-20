import React from "react";
import "../style/HeaderComp.css"; // Импортируйте стили

const HeaderComp = () => {
  return (
    <header className="header">
      <div className="logo">E-Delivery</div>
      <p className="tagline">Доставка еды на любой вкус!</p>
    </header>
  );
};

export default HeaderComp;
