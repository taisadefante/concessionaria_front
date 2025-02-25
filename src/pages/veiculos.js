import React, { useState, useEffect } from "react";
import { Modal, Button, Collapse, Form } from "react-bootstrap";
import { FaWhatsapp, FaFilter } from "react-icons/fa";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
  });

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
      setVeiculos(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = veiculos;
    if (filters.brand) {
      filtered = filtered.filter((v) =>
        v.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }
    if (filters.model) {
      filtered = filtered.filter((v) =>
        v.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }
    if (filters.minYear) {
      filtered = filtered.filter((v) => v.year >= parseInt(filters.minYear));
    }
    if (filters.maxYear) {
      filtered = filtered.filter((v) => v.year <= parseInt(filters.maxYear));
    }
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
    setFilteredVehicles(filtered);
  };

  return (
    <section className="py-4 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-dark display-4">
          Todos os Veículos 🚗💨
        </h2>

        <div className="mb-3 text-center">
          <Button
            variant="dark"
            onClick={() => setShowFilters(!showFilters)}
            aria-controls="filter-collapse"
            aria-expanded={showFilters}
          >
            <FaFilter className="me-1" /> Filtrar Veículos
          </Button>
        </div>

        <Collapse in={showFilters}>
          <div id="filter-collapse" className="card card-body mb-4">
            <div className="row">
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    placeholder="Digite a marca"
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    placeholder="Digite o modelo"
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>Ano Mínimo</Form.Label>
                  <Form.Control
                    type="number"
                    name="minYear"
                    value={filters.minYear}
                    onChange={handleFilterChange}
                    placeholder="Ano mínimo"
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>Ano Máximo</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxYear"
                    value={filters.maxYear}
                    onChange={handleFilterChange}
                    placeholder="Ano máximo"
                  />
                </Form.Group>
              </div>
            </div>
            <Button className="mt-3" variant="success" onClick={applyFilters}>
              Aplicar Filtros
            </Button>
          </div>
        </Collapse>

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
    </section>
  );
}

export default Veiculos;
