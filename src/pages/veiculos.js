import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    search: "",
    maxKm: "",
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      if (!res.ok) throw new Error(`Erro ao buscar veículos: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data))
        throw new Error("Resposta da API não é um array.");

      console.log("📌 Veículos carregados:", data);
      setVeiculos(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("❌ Erro ao buscar veículos:", error);
      setVeiculos([]);
      setFilteredVehicles([]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = [...veiculos];

    if (filters.minPrice) {
      filtered = filtered.filter(
        (v) => parseFloat(v.price) >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (v) => parseFloat(v.price) <= parseFloat(filters.maxPrice)
      );
    }
    if (filters.search) {
      filtered = filtered.filter((v) =>
        v.carName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.maxKm) {
      filtered = filtered.filter(
        (v) => parseInt(v.mileage) <= parseInt(filters.maxKm)
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleShowModal = (veiculo) => {
    setSelectedVehicle(veiculo);
    if (veiculo?.images?.length > 0) {
      setMainImage(`${API_BASE_URL}${veiculo.images[0]}`);
    } else {
      setMainImage("");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setMainImage("");
  };

  const generateWhatsAppLink = (veiculo) => {
    const phoneNumber = "+5521988359825";
    const message = `Olá, estou interessado no veículo: ${veiculo.carName}.
    🚗 Marca: ${veiculo.brand}
    📅 Ano: ${veiculo.year}
    🏁 Quilometragem: ${veiculo.mileage.toLocaleString()} km
    💰 Preço: R$ ${veiculo.price.toLocaleString()}
    📌 Opcionais: ${veiculo.options || "Nenhum"}
    📝 Descrição: ${veiculo.description || "Não informado"}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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
          Todos os Veículos 🚗💨
        </h2>
        <div className="row">
          {/* Lista de Veículos */}
          <div className="col-lg-12 col-md-12 col-sm-12">
            {filteredVehicles.length === 0 ? (
              <p className="text-center">Nenhum veículo encontrado.</p>
            ) : (
              <div className="row">
                {filteredVehicles.map((veiculo) => (
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
          </div>
        </div>
      </div>

      {/* MODAL COM CARROSSEL E MINIATURAS */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedVehicle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {/* 🔹 Coluna da Imagem Principal com Carrossel */}
                <div className="col-md-6 text-center">
                  {selectedVehicle.images?.length > 0 ? (
                    <Carousel>
                      {selectedVehicle.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={`${API_BASE_URL}${img}`}
                            className="d-block w-100 rounded"
                            alt={`Imagem ${index + 1}`}
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

export default Veiculos;
