import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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
  const [mainImage, setMainImage] = useState(""); // Estado para a imagem principal

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      const data = await res.json();
      console.log("📌 Veículos carregados:", data);
      setVeiculos(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("❌ Erro ao buscar veículos:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = veiculos;
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
      setMainImage(""); // Caso não tenha imagens
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setMainImage(""); // Resetar a imagem principal ao fechar
  };

  const generateWhatsAppLink = (veiculo) => {
    const phoneNumber = "+5521988359825";
    const message = `Olá, estou interessado no veículo: ${veiculo.carName}.
    🚗 Marca: ${veiculo.brand}
    📅 Ano: ${veiculo.year}
    🏁 Quilometragem: ${veiculo.mileage.toLocaleString()} km
    💰 Preço: R$ ${veiculo.price.toLocaleString()}
    📌 Opcionais: ${veiculo.options || "Nenhum"}`;
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
          {/* Sidebar de Filtros */}
          <aside className="col-lg-3 col-md-4 col-sm-12 mb-4">
            <div className="p-3 bg-white shadow-sm rounded">
              <h5>Filtrar Veículos</h5>

              <Form.Group className="mb-3">
                <Form.Label>Valor Mínimo (R$)</Form.Label>
                <Form.Control
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Valor Máximo (R$)</Form.Label>
                <Form.Control
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Buscar Veículo</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Digite o nome do veículo"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quilometragem Máxima</Form.Label>
                <Form.Control
                  type="number"
                  name="maxKm"
                  value={filters.maxKm}
                  onChange={handleFilterChange}
                />
              </Form.Group>

              <Button variant="dark" className="w-100" onClick={applyFilters}>
                Pesquisar
              </Button>
            </div>
          </aside>

          {/* Modal de Detalhes */}
          <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
            {selectedVehicle && (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedVehicle.carName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    {/* 🔹 Coluna da Imagem Principal */}
                    <div className="col-md-6 text-center">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          className="img-fluid rounded"
                          alt={selectedVehicle.carName}
                          style={{
                            maxHeight: "300px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
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
                            onClick={() =>
                              setMainImage(`${API_BASE_URL}${img}`)
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* 🔹 Coluna com Informações do Veículo */}
                    <div className="col-md-6">
                      <p>
                        <strong>Modelo:</strong> {selectedVehicle.model}
                      </p>
                      <p>
                        <strong>Marca:</strong> {selectedVehicle.brand}
                      </p>
                      <p>
                        <strong>Ano:</strong> {selectedVehicle.year}
                      </p>
                      <p>
                        <strong>Cor:</strong> {selectedVehicle.color}
                      </p>
                      <p>
                        <strong>KM:</strong> {selectedVehicle.mileage} km
                      </p>
                      <p>
                        <strong>Opcionais:</strong>{" "}
                        {selectedVehicle.options || "Nenhum"}
                      </p>
                      <p className="fw-bold text-danger">
                        <strong>Preço:</strong> R$ {selectedVehicle.price}
                      </p>
                      <a
                        href={generateWhatsAppLink(selectedVehicle)}
                        className="btn btn-success w-100"
                      >
                        <FaWhatsapp className="me-1" /> Fale Conosco
                      </a>
                    </div>
                  </div>
                </Modal.Body>
              </>
            )}
          </Modal>
        </div>
      </div>
    </section>
  );
}

export default Veiculos;
