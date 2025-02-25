import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel, Form } from "react-bootstrap";
import { FaWhatsapp, FaFilter } from "react-icons/fa";
import API_BASE_URL from "../services/api";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minKm: "",
    maxKm: "",
  });
  const [showFilters, setShowFilters] = useState(false); // Exibir/ocultar filtro em telas menores

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

      console.log("📌 Veículos carregados:", data);
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
    let filtered = [...veiculos];

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
    if (filters.minYear) {
      filtered = filtered.filter(
        (v) => parseInt(v.year) >= parseInt(filters.minYear)
      );
    }
    if (filters.maxYear) {
      filtered = filtered.filter(
        (v) => parseInt(v.year) <= parseInt(filters.maxYear)
      );
    }
    if (filters.minKm) {
      filtered = filtered.filter(
        (v) => parseInt(v.mileage) >= parseInt(filters.minKm)
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
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setMainImage("");
  };

  const generateWhatsAppLink = (veiculo) => {
    const phoneNumber = "+5521988359825";
    const message = `Olá, estou interessado no veículo: ${veiculo.carName}.
    🚗 Marca: ${veiculo.brand}
    📅 Ano: ${veiculo.year}
    🏁 Quilometragem: ${veiculo.mileage.toLocaleString()} km
    💰 Preço: R$ ${veiculo.price.toLocaleString()}
    📌 Opcionais: ${veiculo.options || "Nenhum"}
    📝 Descrição: ${veiculo.description || "Não informada"}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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

        {/* Botão para abrir filtro em telas menores */}
        <Button
          variant="dark"
          className="d-md-none mb-3"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filtrar Veículos
        </Button>

        <div className="row">
          {/* Sidebar de Filtros */}
          <aside
            className={`col-lg-3 col-md-4 mb-4 ${
              showFilters ? "d-block" : "d-none d-md-block"
            }`}
          >
            <div className="p-3 bg-white shadow-sm rounded">
              <h5>Filtrar Veículos</h5>

              {/* 🔹 Organização dos filtros */}
              <div className="row">
                <Form.Group className="col-6 mb-3">
                  <Form.Label>Menor Valor (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    onChange={handleFilterChange}
                  />
                </Form.Group>
                <Form.Group className="col-6 mb-3">
                  <Form.Label>Maior Valor (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Form.Group className="col-6 mb-3">
                  <Form.Label>Menor Ano</Form.Label>
                  <Form.Control
                    type="number"
                    name="minYear"
                    onChange={handleFilterChange}
                  />
                </Form.Group>
                <Form.Group className="col-6 mb-3">
                  <Form.Label>Maior Ano</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxYear"
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Form.Group className="col-6 mb-3">
                  <Form.Label>Menor KM</Form.Label>
                  <Form.Control
                    type="number"
                    name="minKm"
                    onChange={handleFilterChange}
                  />
                </Form.Group>
                <Form.Group className="col-6 mb-3">
                  <Form.Label>Maior KM</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxKm"
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </div>

              <Button variant="dark" className="w-100" onClick={applyFilters}>
                Pesquisar
              </Button>
            </div>
          </aside>

          {/* Lista de Veículos */}
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
                      />

                      <div className="card-body text-center">
                        <h5>{veiculo.carName}</h5>
                        <p>
                          {veiculo.year} - {veiculo.mileage} km
                        </p>
                        <p className="fw-bold text-danger">
                          R$ {veiculo.price.toLocaleString()}
                        </p>

                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="dark"
                            size="sm"
                            onClick={() => handleShowModal(veiculo)}
                          >
                            Detalhes
                          </Button>
                          <a
                            href={generateWhatsAppLink(veiculo)}
                            className="btn btn-success btn-sm"
                          >
                            <FaWhatsapp /> WhatsApp
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
    </section>
  );
}

export default Veiculos;
