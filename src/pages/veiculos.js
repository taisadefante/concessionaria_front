import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import API_BASE_URL from "../services/api"; // Importando URL da API

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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      const data = await res.json();
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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  const generateWhatsAppLink = (veiculo) => {
    const phoneNumber = "+5521988359825";
    const message = `Olá, estou interessado no veículo: ${veiculo.carName}.
    🚗 Marca: ${veiculo.brand}
    📅 Ano: ${veiculo.year}
    🏁 Quilometragem: ${veiculo.mileage.toLocaleString()} km
    💰 Preço: R$ ${veiculo.price.toLocaleString()}
    📌 Opcionais: ${veiculo.options || "Nenhum"}
    🔍 Descrição: ${veiculo.description}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Todos os Veículos 🚗💨</h2>

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

          {/* Lista de Veículos */}
          <div className="col-lg-9 col-md-8 col-sm-12">
            {filteredVehicles.length === 0 ? (
              <p className="text-center">Nenhum veículo encontrado.</p>
            ) : (
              <div className="row">
                {filteredVehicles.map((veiculo) => (
                  <div
                    key={veiculo.id}
                    className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  >
                    <div className="card shadow-sm">
                      {veiculo.images?.length > 0 ? (
                        <img
                          src={`${API_BASE_URL}${veiculo.images[0]}`}
                          className="card-img-top"
                          alt={veiculo.carName}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="bg-secondary text-white d-flex align-items-center justify-content-center"
                          style={{ height: "180px" }}
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
                    src={`${API_BASE_URL}${selectedVehicle.images?.[0]}`}
                    className="img-fluid rounded"
                    alt={selectedVehicle.carName}
                  />
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Modelo:</strong> {selectedVehicle.model}
                  </p>
                  <p>
                    <strong>Ano:</strong> {selectedVehicle.year}
                  </p>
                  <p>
                    <strong>Cor:</strong> {selectedVehicle.color}
                  </p>
                  <p>
                    <strong>Quilometragem:</strong>{" "}
                    {selectedVehicle.mileage.toLocaleString()} km
                  </p>
                  <p>
                    <strong>Preço:</strong> R${" "}
                    {selectedVehicle.price.toLocaleString()}
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
