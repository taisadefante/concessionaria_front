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

  const goToVehiclesPage = () => {
    navigate("/veiculos");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
