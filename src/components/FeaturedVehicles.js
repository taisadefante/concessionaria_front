import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importação do useNavigate

function FeaturedVehicles() {
  const [veiculos, setVeiculos] = useState([]);
  const [displayedVehicles, setDisplayedVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Instância do hook para navegação

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

  // 🔹 Função para redirecionar para a página /veiculos e rolar para o topo
  const goToVehiclesPage = () => {
    navigate("/veiculos");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Faz a rolagem suave para o topo
  };

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2 className="text-center mb-4">🚗 Veículos em Destaque</h2>

        {displayedVehicles.length === 0 ? (
          <p className="text-center">Nenhum veículo disponível no momento.</p>
        ) : (
          <div className="row">
            {displayedVehicles.map((veiculo) => (
              <div key={veiculo.id} className="col-md-4 mb-4">
                <div
                  className="card shadow-sm"
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "0.3s",
                  }}
                >
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
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-dark"
                        style={{ flex: "1", marginRight: "5px" }}
                        onClick={() => handleShowModal(veiculo)}
                      >
                        Detalhes
                      </button>
                      <a
                        href={generateWhatsAppLink(veiculo)}
                        className="btn btn-success d-flex align-items-center justify-content-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: "1" }}
                      >
                        <FaWhatsapp style={{ marginRight: "8px" }} />
                        Fale Conosco
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Botão Centralizado "Veja Todos os Nossos Veículos" */}
        <div className="text-center mt-4">
          <button
            className="btn btn-warning"
            style={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
            onClick={goToVehiclesPage} // Chama a função que navega e rola ao topo
          >
            🚘 Veja Todos os Nossos Veículos
          </button>
        </div>
      </div>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedVehicle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedVehicle.image && (
                <img
                  src={`http://localhost:3001${selectedVehicle.image}`}
                  className="img-fluid mb-3"
                  alt={selectedVehicle.carName}
                />
              )}
              <p>
                <strong>Descrição:</strong> {selectedVehicle.description}
              </p>
              <p>
                <strong>Preço:</strong> R$ {selectedVehicle.price}
              </p>
              <p>
                <strong>Ano:</strong> {selectedVehicle.year}
              </p>
              <p>
                <strong>Modelo:</strong> {selectedVehicle.model}
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
}

export default FeaturedVehicles;
