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
    let filtered = veiculos.filter((veiculo) => {
      return (
        (filters.name === "" ||
          veiculo.carName.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.model === "" ||
          veiculo.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (filters.brand === "" ||
          veiculo.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (filters.color === "" ||
          veiculo.color.toLowerCase().includes(filters.color.toLowerCase())) &&
        (filters.minYear === "" ||
          parseInt(veiculo.year) >= parseInt(filters.minYear)) &&
        (filters.maxYear === "" ||
          parseInt(veiculo.year) <= parseInt(filters.maxYear)) &&
        (filters.minPrice === "" ||
          parseFloat(veiculo.price) >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          parseFloat(veiculo.price) <= parseFloat(filters.maxPrice)) &&
        (filters.minKm === "" ||
          parseInt(veiculo.mileage) >= parseInt(filters.minKm)) &&
        (filters.maxKm === "" ||
          parseInt(veiculo.mileage) <= parseInt(filters.maxKm))
      );
    });
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
            <Form>
              {Object.keys(filters).map((key) => (
                <Form.Control
                  key={key}
                  type={
                    key.includes("Price") ||
                    key.includes("Year") ||
                    key.includes("Km")
                      ? "number"
                      : "text"
                  }
                  name={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  className="mb-2"
                  onChange={handleFilterChange}
                />
              ))}
              <Button variant="dark" className="w-100" onClick={applyFilters}>
                Pesquisar
              </Button>
            </Form>
          </div>
        </Collapse>

        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          {selectedVehicle && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedVehicle.carName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Detalhes do veículo:{" "}
                  {selectedVehicle.description || "Sem descrição disponível."}
                </p>
                <a
                  href={`https://wa.me/21988359825?text=Olá, estou interessado no ${selectedVehicle.carName}`}
                  className="btn btn-success w-100 mt-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="me-1" /> Fale Conosco
                </a>
              </Modal.Body>
            </>
          )}
        </Modal>
      </div>
    </section>
  );
}

export default Veiculos;
