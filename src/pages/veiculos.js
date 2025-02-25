import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel, Form, Collapse } from "react-bootstrap";
import { FaWhatsapp, FaFilter } from "react-icons/fa";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    model: "",
    brand: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minKm: "",
    maxKm: "",
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
    const filtered = veiculos.filter((veiculo) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key.includes("min"))
          return (
            parseFloat(veiculo[key.replace("min", "")]) >= parseFloat(value)
          );
        if (key.includes("max"))
          return (
            parseFloat(veiculo[key.replace("max", "")]) <= parseFloat(value)
          );
        return veiculo[key].toLowerCase().includes(value.toLowerCase());
      })
    );
    setFilteredVehicles(filtered);
  };

  const handleShowModal = (veiculo) => {
    setSelectedVehicle(veiculo);
    setMainImage(
      veiculo.images?.length > 0 ? `${API_BASE_URL}${veiculo.images[0]}` : ""
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setMainImage("");
  };

  return (
    <section className="py-4 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-dark">
          Todos os Veículos 🚗💨
        </h2>

        <Button
          variant="dark"
          className="d-md-none mb-3"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filtrar Veículos
        </Button>

        <Collapse in={showFilters}>
          <div className="p-3 bg-white shadow-sm rounded mb-4">
            <h5>Filtrar Veículos</h5>
            {Object.keys(filters).map((key) => (
              <Form.Control
                key={key}
                type="text"
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1")}
                className="mb-2 form-control-sm"
                onChange={handleFilterChange}
              />
            ))}
            <Button variant="dark" className="w-100" onClick={applyFilters}>
              Pesquisar
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
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5>{veiculo.carName}</h5>
                  <p>
                    {veiculo.model} - {veiculo.year} - {veiculo.mileage} km
                  </p>
                  <div className="mt-auto d-flex justify-content-between gap-2">
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleShowModal(veiculo)}
                    >
                      Detalhes
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      href={`https://wa.me/?text=Olá, estou interessado no ${veiculo.carName}`}
                    >
                      <FaWhatsapp /> Fale Conosco
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedVehicle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Detalhes do veículo...</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </section>
  );
}

export default Veiculos;
