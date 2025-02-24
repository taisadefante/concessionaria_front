import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // 🔹 Ícone do WhatsApp

function Sobre() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* 📌 Coluna da Logo */}
        <div className="col-md-4 text-center">
          <img
            src="/img/logo.png" // 🔹 Altere para o caminho correto da logo
            alt="Logo da Concessionária"
            className="img-fluid"
            style={{ maxWidth: "250px", height: "auto" }}
          />
        </div>

        {/* 📌 Coluna do Texto */}
        <div className="col-md-8">
          {/* 🔹 Título com cor cinza conforme solicitado */}
          <h2
            className="fw-bold text-center text-md-start"
            style={{ color: "#6c757d" }}
          >
            A Melhor Concessionária da Cidade 🚗💨
          </h2>

          {/* 🔹 Texto maior e mais detalhado */}
          <p className="lead mt-3 text-center text-md-start">
            Bem-vindo à <strong>Sua Concessionária de Confiança</strong>,
            referência em
            <span className="text-danger fw-bold"> compra</span>,
            <span className="text-success fw-bold"> venda</span> e
            <span className="text-primary fw-bold"> consultoria</span> de
            veículos. Nossa missão é oferecer
            <strong> qualidade, segurança e as melhores ofertas</strong>,
            garantindo que você encontre o carro dos seus sonhos com
            transparência e confiança.
          </p>

          <p className="text-center text-md-start">
            Oferecemos um serviço completo para atender todas as suas
            necessidades automotivas:
          </p>

          {/* 🔹 Lista de Serviços */}
          <ul className="list-unstyled text-center text-md-start">
            <li>
              ✅ <strong>Compra:</strong> Ofertas exclusivas nos melhores
              veículos.
            </li>
            <li>
              ✅ <strong>Venda:</strong> Valorizamos seu carro com as melhores
              condições.
            </li>
            <li>
              ✅ <strong>Consignação:</strong> Venda seu veículo com segurança e
              sem preocupações.
            </li>
            <li>
              ✅ <strong>Consultoria de Veículos:</strong> Orientação
              especializada para a melhor escolha.
            </li>
            <li>
              ✅ <strong>Indicação de Mecânico:</strong> Parceiros de confiança
              para manutenção do seu carro.
            </li>
          </ul>

          {/* 🔹 Botão do WhatsApp Centralizado */}
          <div className="d-flex justify-content-center mt-4">
            <a
              href="https://wa.me/21988359825"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success d-flex align-items-center"
              style={{
                maxWidth: "200px",
                padding: "10px 20px",
                fontSize: "18px",
              }}
            >
              <FaWhatsapp style={{ marginRight: "10px", fontSize: "24px" }} />
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
