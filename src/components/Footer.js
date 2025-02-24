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
            padding: 20px 0;
            text-align: center;
            position: relative;
            width: 100%;
            bottom: 0;
          }

          /* 🔹 Garante que o Footer fique sempre no final */
          .page-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .content-wrap {
            flex: 1;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
