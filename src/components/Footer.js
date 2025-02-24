import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-center mb-0">
          © {new Date().getFullYear()} Defan Soluções Digitais - Todos os
          direitos reservados
        </p>
      </div>

      <style>
        {`
          .footer {
            background-color: #343a40;
            color: #fff;
            padding: 15px 0;
            text-align: center;
            position: relative;
            width: 100%;
            bottom: 0;
          }

          .text-center {
            font-size: 1rem; /* 🔹 Define o tamanho base */
            max-width: 90%; /* 🔹 Garante que o texto não ultrapasse a largura */
            margin: 0 auto; /* 🔹 Centraliza o texto */
          }

          /* 🔹 Tamanhos responsivos para diferentes telas */
          @media (max-width: 768px) {
            .text-center {
              font-size: 0.9rem; /* 🔹 Reduz um pouco em tablets */
            }
          }

          @media (max-width: 480px) {
            .text-center {
              font-size: 0.75rem; /* 🔹 Reduz mais em telas pequenas */
            }
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
