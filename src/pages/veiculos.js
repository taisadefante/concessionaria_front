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
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2
          className="text-center fs-3 mb-4"
          style={{ fontWeight: "bold", color: "#333" }}
        >
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
            <Form.Control
              type="text"
              name="name"
              placeholder="Nome"
              className="mb-2 form-control-sm"
              onChange={handleFilterChange}
            />
            <Form.Control
              type="text"
              name="model"
              placeholder="Modelo"
              className="mb-2 form-control-sm"
              onChange={handleFilterChange}
            />
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
    </section>
  );
}

export default Veiculos;
