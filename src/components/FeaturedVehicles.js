import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function FeaturedVehicles() {
  const [veiculos, setVeiculos] = useState([]);
  const [displayedVehicles, setDisplayedVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 🔹 Detecta se a tela é menor que 768px (modo mobile)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/vehicles");
      const data = await res.json();
      setVeiculos(data);
      updateDisplayedVehicles(data);
    } catch (error) {
      console.error("❌ Erro ao buscar veículos:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateDisplayedVehicles(veiculos);
    }, 3600000);

    return () => clearInterval(interval);
  }, [veiculos]);

  const updateDisplayedVehicles = (allVehicles) => {
    if (allVehicles.length > 3) {
      const shuffled = [...allVehicles].sort(() => 0.5 - Math.random());
      setDisplayedVehicles(shuffled.slice(0, 3));
    } else {
      setDisplayedVehicles(allVehicles);
    }
  };

  const handleShowModal = (veiculo) => {
    setSelectedVehicle(veiculo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  const generateWhatsAppLink = (veiculo) => {
    const phoneNumber = "21988359825";
    const message = `Olá, estou interessado no veículo: ${veiculo.carName} ${veiculo.model} (${veiculo.year}). Preço: R$ ${veiculo.price}. Gostaria de mais informações.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const goToVehiclesPage = () => {
    navigate("/veiculos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2
          style={{
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          Veículos em Destaque
        </h2>

        {displayedVehicles.length === 0 ? (
          <p className="text-center">Nenhum veículo disponível no momento.</p>
        ) : isMobile ? (
          /* 🔹 Exibir como Carrossel no Mobile com Setas */
          <Carousel
            indicators={false}
            interval={3000}
            nextIcon={
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={{ filter: "invert(50%)" }}
              />
            }
            prevIcon={
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={{ filter: "invert(50%)" }}
              />
            }
          >
            {displayedVehicles.map((veiculo) => (
              <Carousel.Item key={veiculo.id}>
                <div className="d-flex justify-content-center">
                  <div className="card shadow-sm" style={{ maxWidth: "90%" }}>
                    {veiculo.image ? (
                      <img
                        src={`http://localhost:3001${veiculo.image}`}
                        className="card-img-top"
                        alt={veiculo.carName}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{ height: "200px" }}
                      >
                        Sem Imagem
                      </div>
                    )}

                    <div className="card-body text-center">
                      <h5
                        className="card-title"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {veiculo.carName}
                      </h5>
                      <p
                        className="card-text"
                        style={{ fontSize: "0.9rem", color: "#555" }}
                      >
                        {veiculo.model} - {veiculo.year} - {veiculo.color}
                      </p>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        R$ {veiculo.price}
                      </p>

                      <button
                        className="btn btn-dark w-100"
                        onClick={() => handleShowModal(veiculo)}
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          /* 🔹 Exibir como Grid em Telas Maiores */
          <div className="row">
            {displayedVehicles.map((veiculo) => (
              <div key={veiculo.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  {veiculo.image ? (
                    <img
                      src={`http://localhost:3001${veiculo.image}`}
                      className="card-img-top"
                      alt={veiculo.carName}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ height: "200px" }}
                    >
                      Sem Imagem
                    </div>
                  )}

                  <div className="card-body text-center">
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {veiculo.carName}
                    </h5>
                    <p
                      className="card-text"
                      style={{ fontSize: "0.9rem", color: "#555" }}
                    >
                      {veiculo.model} - {veiculo.year} - {veiculo.color}
                    </p>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      R$ {veiculo.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Botão para ver todos os veículos */}
        <div className="text-center mt-4">
          <button
            className="btn btn-warning"
            style={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
            onClick={goToVehiclesPage}
          >
            🚘 Veja Todos os Nossos Veículos
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVehicles;
