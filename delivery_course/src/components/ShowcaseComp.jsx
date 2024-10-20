import React from "react";
import { Card, Image, Modal } from "antd";
import ImageCard from "./ImageCard"; // Предполагается, что ImageCard находится в той же папке

const CarouselComp = () => {
  // Массив изображений с миниатюрами и полными изображениями
  const images = [
    {
      thumbnail:
        "https://cs.inappstory.ru/story/dej/tvm/wbe/mn4scsslsafelrkm8hlvq5e/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=419657080",
      full: "https://cs.inappstory.ru/story/dej/tvm/wbe/mn4scsslsafelrkm8hlvq5e/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=419657080", // Полное изображение
    },
    {
      thumbnail:
        "https://cs.inappstory.ru/story/kft/ygz/lra/xiabr3zlhw0wb3caz4njtsu/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=2733769013",
      full: "https://cs.inappstory.ru/story/kft/ygz/lra/xiabr3zlhw0wb3caz4njtsu/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=2733769013",
    },
    {
      thumbnail:
        "https://cs.inappstory.ru/story/wx8/rk9/wvw/j0pwycynmhkt4vhyrgifrnc/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=2086261544",
      full: "https://cs.inappstory.ru/story/wx8/rk9/wvw/j0pwycynmhkt4vhyrgifrnc/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=2086261544",
    },
    {
      thumbnail:
        "https://cs.inappstory.ru/story/4el/tuy/1cz/3e1esyv5wf6kdpoyjemiup4/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=3314274688",
      full: "https://cs.inappstory.ru/story/4el/tuy/1cz/3e1esyv5wf6kdpoyjemiup4/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=3314274688",
    },
    {
      thumbnail:
        "https://cs.inappstory.ru/story/w9g/5lb/ibw/mrjvplbnanmzbrpjfm3ot98/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=3882235177",
      full: "https://cs.inappstory.ru/story/4el/tuy/1cz/3e1esyv5wf6kdpoyjemiup4/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=3314274688",
    },
    {
      thumbnail:
        "https://cs.inappstory.ru/story/zfw/rdw/lwt/jnycf5ey3rgtslhyd5rqfur/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=3457730739",
      full: "https://cs.inappstory.ru/story/4el/tuy/1cz/3e1esyv5wf6kdpoyjemiup4/custom_cover/logo-350x440.webp?k=pwEAAAAAAAAEAA&v=3314274688",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1%",
        justifyContent: "center",
        margin: "0px 0px 0px 0px",
      }}
    >
      {images.map((image, index) => (
        <ImageCard
          key={index}
          thumbnail={image.thumbnail}
          fullImage={image.full}
        />
      ))}
    </div>
  );
};

export default CarouselComp;
