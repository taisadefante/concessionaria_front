import React from "react";
import { Carousel } from "react-bootstrap";

function Banner() {
  const bannerImages = [
    "/img/banner1.jpg",
    "/img/banner2.jpg",
    "/img/banner.jpg", // Corrigido o nome do terceiro banner
  ];

  return (
    <section style={{ position: "relative", width: "100%", maxWidth: "100%" }}>
      <Carousel indicators={true} controls={true} interval={3000}>
        {bannerImages.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="d-block w-100"
              style={{
                height: "auto",
                maxHeight: "500px", // 🔹 Máximo de 500px para telas grandes
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default Banner;
