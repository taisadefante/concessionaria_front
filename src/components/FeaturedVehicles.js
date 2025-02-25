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
        <h2 className="text-center mb-4">Veículos em Destaque</h2>

        {displayedVehicles.length === 0 ? (
          <p className="text-center">Nenhum veículo disponível no momento.</p>
        ) : isMobile ? (
          // 🔹 Exibir apenas um card por vez no carrossel no Mobile
          <Carousel
            indicators={false}
            interval={3000}
            nextIcon={
              <span
                className="carousel-control-next-icon"
                style={{ filter: "invert(50%)" }}
              />
            }
            prevIcon={
              <span
                className="carousel-control-prev-icon"
                style={{ filter: "invert(50%)" }}
              />
            }
          >
            {displayedVehicles.map((veiculo) => (
              <Carousel.Item key={veiculo.id}>
                <div className="d-flex justify-content-center">
                  <div className="card shadow-sm" style={{ maxWidth: "90%" }}>
                    {veiculo.images && veiculo.images.length > 0 ? (
                      <img
                        src={`http://localhost:3001${veiculo.images[0]}`} // 🔹 Corrigido acesso à imagem
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
                      <h5 className="card-title">{veiculo.carName}</h5>
                      <p className="card-text">
                        {veiculo.model} - {veiculo.year} - {veiculo.color}
                      </p>
                      <p className="fw-bold text-danger">
                        R$ {veiculo.price.toLocaleString()}
                      </p>

                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => handleShowModal(veiculo)}
                        >
                          Detalhes
                        </button>
                        <a
                          href={generateWhatsAppLink(veiculo)}
                          className="btn btn-success btn-sm d-flex align-items-center"
                        >
                          <FaWhatsapp className="me-1" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="row">
            {displayedVehicles.map((veiculo) => (
              <div key={veiculo.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  {veiculo.images && veiculo.images.length > 0 ? (
                    <img
                      src={`http://localhost:3001${veiculo.images[0]}`} // 🔹 Corrigido acesso à imagem
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
                    <h5 className="card-title">{veiculo.carName}</h5>
                    <p className="card-text">
                      {veiculo.model} - {veiculo.year} - {veiculo.color}
                    </p>
                    <p className="fw-bold text-danger">
                      R$ {veiculo.price.toLocaleString()}
                    </p>

                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => handleShowModal(veiculo)}
                      >
                        Detalhes
                      </button>
                      <a
                        href={generateWhatsAppLink(veiculo)}
                        className="btn btn-success btn-sm d-flex align-items-center"
                      >
                        <FaWhatsapp className="me-1" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

      {/* Modal de Detalhes */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedVehicle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`http://localhost:3001${selectedVehicle.images?.[0]}`} // 🔹 Corrigido acesso à imagem
                    className="img-fluid rounded"
                    alt={selectedVehicle.carName}
                  />
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </section>
  );
}

export default FeaturedVehicles;
