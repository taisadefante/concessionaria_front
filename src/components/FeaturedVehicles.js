import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import API_BASE_URL from "../services/api";

function FeaturedVehicles() {
  const [veiculos, setVeiculos] = useState([]);
  const [displayedVehicles, setDisplayedVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState(""); // Definir imagem principal
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      if (!res.ok) throw new Error("Erro ao buscar veículos");

      const data = await res.json();
      console.log("🚗 Veículos carregados:", data);

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
    if (veiculo?.images?.length > 0) {
      setMainImage(`${API_BASE_URL}${veiculo.images[0]}`);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setMainImage(""); // Reseta a imagem principal ao fechar o modal
  };

  const generateWhatsAppLink = (veiculo) => {
    const phoneNumber = "21988359825";
    const message = `Olá, estou interessado no veículo: ${veiculo.carName} (${
      veiculo.year
    }). 🚗 Marca: ${veiculo.brand} 📅 Ano: ${
      veiculo.year
    } 🏁 Quilometragem: ${veiculo.mileage.toLocaleString()} km 💰 Preço: R$ ${veiculo.price.toLocaleString()} 📌 Opcionais: ${
      veiculo.options || "Nenhum"
    }`;

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
          className="mt-4 text-center fs-3"
          style={{
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#333",
            fontSize: "28px",
          }}
        >
          Veículos em Destaque
        </h2>
        {displayedVehicles.length === 0 ? (
          <p className="text-center">Nenhum veículo disponível no momento.</p>
        ) : (
          <div className="row">
            {displayedVehicles.map((veiculo) => (
              <div key={veiculo.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  {veiculo.images?.length > 0 ? (
                    <img
                      src={`${API_BASE_URL}${veiculo.images[0]}`}
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
          <button className="btn btn-warning" onClick={goToVehiclesPage}>
            🚘 Veja Todos os Nossos Veículos
          </button>
        </div>
      </div>

      {/* MODAL DE DETALHES COM MINIATURAS E BOTÃO "FALE CONOSCO" */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedVehicle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {/* 🔹 Carrossel de Imagens */}
                <div className="col-md-6 text-center">
                  {selectedVehicle.images?.length > 0 ? (
                    <Carousel>
                      <Carousel.Item>
                        <img
                          src={mainImage}
                          className="d-block w-100 rounded"
                          alt="Imagem principal"
                          style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    </Carousel>
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ height: "300px" }}
                    >
                      Sem Imagem
                    </div>
                  )}

                  {/* 🔹 Miniaturas das Imagens */}
                  <div className="d-flex justify-content-center mt-3">
                    {selectedVehicle.images?.map((img, index) => (
                      <img
                        key={index}
                        src={`${API_BASE_URL}${img}`}
                        alt={`Imagem ${index + 1}`}
                        className="img-thumbnail mx-1"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          cursor: "pointer",
                          border:
                            mainImage === `${API_BASE_URL}${img}`
                              ? "2px solid #007bff"
                              : "none",
                        }}
                        onClick={() => setMainImage(`${API_BASE_URL}${img}`)}
                      />
                    ))}
                  </div>
                </div>

                {/* 🔹 Coluna com Informações do Veículo */}
                <div className="col-md-6">
                  <p>
                    <strong>Marca:</strong> {selectedVehicle.brand}
                  </p>
                  <p>
                    <strong>Modelo:</strong> {selectedVehicle.model}
                  </p>
                  <p>
                    <strong>Ano:</strong> {selectedVehicle.year}
                  </p>
                  <p>
                    <strong>Quilometragem:</strong> {selectedVehicle.mileage} km
                  </p>
                  <p>
                    <strong>Cor:</strong> {selectedVehicle.color}
                  </p>
                  <p>
                    <strong>Opcionais:</strong>{" "}
                    {selectedVehicle.options || "Nenhum"}
                  </p>
                  <p>
                    <strong>Descrição:</strong>{" "}
                    {selectedVehicle.description || "Não informada"}
                  </p>
                  <a
                    href={generateWhatsAppLink(selectedVehicle)}
                    className="btn btn-success w-100 mt-3"
                  >
                    <FaWhatsapp className="me-1" /> Fale Conosco
                  </a>
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
