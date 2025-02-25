import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      console.log("🔍 Buscando veículos...");
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      if (!res.ok) throw new Error(`Erro ao buscar veículos: ${res.status}`);
      const data = await res.json();
      console.log("✅ Dados recebidos:", data);
      if (!Array.isArray(data))
        throw new Error("Resposta da API não é um array.");
      setVeiculos(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("❌ Erro ao buscar veículos:", error);
      setVeiculos([]);
      setFilteredVehicles([]);
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

  return (
    <section className="py-4 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-dark">
          Todos os Veículos... 🚗💨
        </h2>

        <div className="row">
          {filteredVehicles.map((veiculo) => (
            <div key={veiculo.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 d-flex flex-column">
                <img
                  src={`${API_BASE_URL}${veiculo.images?.[0]}`}
                  className="card-img-top"
                  alt={veiculo.carName}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="fw-bold">{veiculo.carName}</h5>
                  <p className="text-muted">
                    {veiculo.model} - {veiculo.year} - {veiculo.mileage} km
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleShowModal(veiculo)}
                    >
                      Detalhes
                    </Button>
                    <a
                      href={`https://wa.me/21988359825?text=Olá, estou interessado no ${veiculo.carName}`}
                      className="btn btn-success btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="me-1" /> Fale Conosco
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE DETALHES */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedVehicle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6 text-center">
                  {selectedVehicle.images?.length > 0 ? (
                    <Carousel>
                      {selectedVehicle.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={`${API_BASE_URL}${img}`}
                            className="d-block w-100 rounded"
                            alt="Imagem principal"
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ height: "300px" }}
                    >
                      Sem Imagem
                    </div>
                  )}
                </div>
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
                    href={`https://wa.me/21988359825?text=Olá, estou interessado no ${selectedVehicle.carName}`}
                    className="btn btn-success w-100 mt-3"
                    target="_blank"
                    rel="noopener noreferrer"
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

export default Veiculos;
