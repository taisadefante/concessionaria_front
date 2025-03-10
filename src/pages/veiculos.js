import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Collapse, Carousel } from "react-bootstrap";
import { FaWhatsapp, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    carName: "",
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
      console.log("📌 Dados recebidos da API:", data);
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
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      console.log("🔍 Filtros atualizados:", updatedFilters);
      return updatedFilters;
    });
  };

  useEffect(() => {
    let filtered = [...veiculos];

    if (filters.carName) {
      filtered = filtered.filter((v) =>
        v.carName.toLowerCase().includes(filters.carName.toLowerCase())
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

    console.log("🔍 Veículos filtrados:", filtered);
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
              {[
                { key: "carName", label: "Nome" },
                { key: "brand", label: "Marca" },
                { key: "model", label: "Modelo" },
                { key: "year", label: "Ano" },
                { key: "color", label: "Cor" },
              ].map((filter) => (
                <div key={filter.key} className="col-md-2">
                  <Form.Group>
                    <Form.Label>{filter.label}</Form.Label>
                    <Form.Control
                      as="select"
                      name={filter.key}
                      value={filters[filter.key]}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos</option>
                      {Array.from(new Set(veiculos.map((v) => v[filter.key])))
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
                <div className="card shadow-sm h-100">
                  <img
                    src={`${API_BASE_URL}${veiculo.images?.[0]}`}
                    className="card-img-top"
                    alt={veiculo.carName}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{veiculo.carName}</h5>
                    <p className="text-muted">
                      {veiculo.model} - {veiculo.year} - {veiculo.mileage} km
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
                        className="btn btn-success btn-sm"
                      >
                        <FaWhatsapp className="me-1" /> WhatsApp
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

export default Veiculos;
