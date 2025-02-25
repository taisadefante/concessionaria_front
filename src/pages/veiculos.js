import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
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
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    mileage: "",
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
    setFilters({ ...filters, [name]: value });
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
        (filters.minYear === "" || veiculo.year >= parseInt(filters.minYear)) &&
        (filters.maxYear === "" || veiculo.year <= parseInt(filters.maxYear)) &&
        (filters.minPrice === "" ||
          veiculo.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          veiculo.price <= parseFloat(filters.maxPrice)) &&
        (filters.mileage === "" ||
          veiculo.mileage.toString().includes(filters.mileage)) &&
        (filters.color === "" ||
          veiculo.color.toLowerCase().includes(filters.color.toLowerCase()))
      );
    });
    setFilteredVehicles(filtered);
  };

  const handleShowModal = (veiculo) => {
    setSelectedVehicle(veiculo);
    setMainImage(
      veiculo.images.length > 0 ? `${API_BASE_URL}${veiculo.images[0]}` : ""
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setMainImage("");
  };

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2
          className="text-center fs-3"
          style={{ fontWeight: "bold", color: "#333" }}
        >
          Todos os Veículos 🚗💨
        </h2>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="p-3 border bg-white">
              <h5>Filtrar Veículos</h5>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="model"
                placeholder="Modelo"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="brand"
                placeholder="Marca"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="minYear"
                placeholder="Ano Inicial"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="maxYear"
                placeholder="Ano Final"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="minPrice"
                placeholder="Valor Mínimo"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Valor Máximo"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="mileage"
                placeholder="Quilometragem"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="color"
                placeholder="Cor"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
              <button className="btn btn-primary w-100" onClick={applyFilters}>
                Pesquisar
              </button>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            {filteredVehicles.length === 0 ? (
              <p className="text-center">Nenhum veículo encontrado.</p>
            ) : (
              <div className="row">
                {filteredVehicles.map((veiculo) => (
                  <div key={veiculo.id} className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                      <img
                        src={`${API_BASE_URL}${veiculo.images[0]}`}
                        className="card-img-top"
                        alt={veiculo.carName}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{veiculo.carName}</h5>
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => handleShowModal(veiculo)}
                        >
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Veiculos;
