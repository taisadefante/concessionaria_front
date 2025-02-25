import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel, Form, Collapse } from "react-bootstrap";
import { FaWhatsapp, FaFilter } from "react-icons/fa";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    color: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      if (!res.ok) throw new Error(`Erro ao buscar veículos: ${res.status}`);
      const data = await res.json();
      setVeiculos(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      setVeiculos([]);
      setFilteredVehicles([]);
    }
  };

  // Atualizar filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Aplicar filtros
  useEffect(() => {
    let filtered = veiculos;

    if (filters.name) {
      filtered = filtered.filter((v) =>
        v.carName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.brand) {
      filtered = filtered.filter((v) => v.brand === filters.brand);
    }
    if (filters.model) {
      filtered = filtered.filter((v) => v.model === filters.model);
    }
    if (filters.year) {
      filtered = filtered.filter((v) => v.year.toString() === filters.year);
    }
    if (filters.color) {
      filtered = filtered.filter((v) => v.color === filters.color);
    }

    setFilteredVehicles(filtered);
  }, [filters, veiculos]);

  const handleShowModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setMainImage(
      vehicle.images?.length > 0 ? `${API_BASE_URL}${vehicle.images[0]}` : ""
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  return (
    <section className="py-4 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fs-3 fw-bold" style={{ color: "#333" }}>
            Todos os Veículos 🚗💨
          </h2>
        </div>
        <div className="mb-4">
          <Button variant="dark" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter className="me-1" /> Filtrar Veículos
          </Button>
        </div>

        {/* Filtros */}
        <Collapse in={showFilters}>
          <div className="card card-body mb-4">
            <div className="row">
              {["name", "brand", "model", "year", "color"].map((filter) => (
                <div key={filter} className="col-md-2">
                  <Form.Group>
                    <Form.Label>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name={filter}
                      value={filters[filter]}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos</option>
                      {Array.from(new Set(veiculos.map((v) => v[filter])))
                        .filter(Boolean)
                        .map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              ))}
            </div>
          </div>
        </Collapse>

        {/* Lista de Veículos */}
        <div className="row">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((veiculo) => (
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
            ))
          ) : (
            <p className="text-center mt-4">Nenhum veículo encontrado.</p>
          )}
        </div>
      </div>
      {/* MODAL DE DETALHES */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedVehicle?.carName || "Detalhes do Veículo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVehicle ? (
            <div className="row">
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
                >
                  <FaWhatsapp className="me-1" /> Fale Conosco
                </a>
              </div>
            </div>
          ) : (
            <p className="text-center">Carregando informações do veículo...</p>
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Veiculos;
