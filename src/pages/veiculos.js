import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Carousel } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

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
      const res = await fetch("http://localhost:3001/api/vehicles");
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
        (v) => v.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (v) => v.price <= parseFloat(filters.maxPrice)
      );
    }
    if (filters.search) {
      filtered = filtered.filter((v) =>
        v.carName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.maxKm) {
      filtered = filtered.filter((v) => v.mileage <= parseFloat(filters.maxKm));
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
    🏁 Quilometragem: ${veiculo.mileage} km
    💰 Preço: R$ ${veiculo.price}
    📌 Opcionais: ${veiculo.options || "Nenhum"}
    🔍 Descrição: ${veiculo.description}
    
    Poderia me passar mais informações?`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container-fluid">
        <h2 className="text-center mb-4">Todos os Veículos</h2>

        <div className="row">
          {/* Sidebar de Filtros - Mantido */}
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
                    <div className="card shadow-sm h-100">
                      <Carousel indicators={false} interval={2000}>
                        {veiculo.images.map((img, index) => (
                          <Carousel.Item key={index}>
                            <img
                              src={`http://localhost:3001${img}`}
                              className="card-img-top"
                              alt={`Imagem ${index + 1}`}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      <div className="card-body text-center">
                        <h5 className="card-title">{veiculo.carName}</h5>
                        <p>
                          <strong>Marca:</strong> {veiculo.brand}
                        </p>
                        <p>
                          <strong>Ano:</strong> {veiculo.year}
                        </p>
                        <p>
                          <strong>Quilometragem:</strong>{" "}
                          {veiculo.mileage.toLocaleString()} km
                        </p>
                        <p className="text-danger fw-bold">
                          <strong>Preço:</strong> R${" "}
                          {veiculo.price.toLocaleString()}
                        </p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-dark"
                            onClick={() => handleShowModal(veiculo)}
                          >
                            Detalhes
                          </button>
                          <a
                            href={generateWhatsAppLink(veiculo)}
                            className="btn btn-success"
                          >
                            <FaWhatsapp /> Fale Conosco
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
                {/* Imagem à esquerda */}
                <div className="col-md-6">
                  {selectedVehicle.images &&
                  selectedVehicle.images.length > 0 ? (
                    <Carousel>
                      {selectedVehicle.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={`http://localhost:3001${img}`}
                            className="img-fluid rounded"
                            alt={`Imagem ${index + 1}`}
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <p className="text-center">Nenhuma imagem disponível</p>
                  )}
                </div>

                {/* Detalhes à direita */}
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
                    <strong>Cor:</strong> {selectedVehicle.color}
                  </p>
                  <p>
                    <strong>KM:</strong>{" "}
                    {selectedVehicle.mileage.toLocaleString()} km
                  </p>{" "}
                  <p>
                    <strong>Opcionais:</strong>{" "}
                    {selectedVehicle.options || "Nenhum"}
                  </p>
                  <p className="text-danger fw-bold">
                    <strong>R$ {selectedVehicle.price.toLocaleString()}</strong>
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <a
                href={generateWhatsAppLink(selectedVehicle)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                <FaWhatsapp /> Fale Conosco
              </a>
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

export default Veiculos;
