import React from "react";

function Services() {
  return (
    <section style={{ backgroundColor: "#f8f9fa", padding: "40px 0" }}>
      <div className="container">
        <div className="row">
          {/* Serviços */}
          <div className="col-md-6">
            <h2>Serviços</h2>
            <ul>
              <li>Compra</li>
              <li>Venda</li>
              <li>Consignação</li>
              <li>Consultoria de Veículos</li>
              <li>Indicação de mecânico</li>
            </ul>
            <a href="#" className="btn btn-primary">
              Saiba Mais
            </a>
          </div>
          {/* Depoimentos */}
          <div className="col-md-6">
            <img src="/img/logo.png" alt="Logo" style={{ maxWidth: "550px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
