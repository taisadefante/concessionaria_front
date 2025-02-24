import React from "react";

function Banner2({ title, subtitle, buttonText, buttonLink }) {
  const imageUrl = process.env.PUBLIC_URL + "/img/baner4.jpg"; // Caminho da imagem na pasta `public`

  return (
    <section className="banner text-center">
      {/* 🔹 Imagem do banner */}
      <img
        src={imageUrl}
        alt="Banner"
        className="img-fluid"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          objectFit: "cover",
        }}
      />

      {/* 🔹 Conteúdo do banner */}
      <div
        className="container position-absolute top-50 start-50 translate-middle text-white text-center"
        style={{
          padding: "20px",
          borderRadius: "10px",
          width: "80%",
        }}
      >
        <h1 className="fw-bold">{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}

        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="btn btn-primary mt-3"
            style={{ fontSize: "18px", padding: "10px 20px" }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

export default Banner2;
