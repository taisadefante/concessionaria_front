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
    year: "",
    minPrice: "",
    maxPrice: "",
    mileage: "",
    brand: "",
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

  useEffect(() => {
    let filtered = veiculos.filter((veiculo) => {
      return (
        (filters.name === "" ||
          veiculo.carName.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.model === "" ||
          veiculo.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (filters.year === "" ||
          veiculo.year.toString().includes(filters.year)) &&
        (filters.minPrice === "" ||
          veiculo.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          veiculo.price <= parseFloat(filters.maxPrice)) &&
        (filters.mileage === "" ||
          veiculo.mileage.toString().includes(filters.mileage)) &&
        (filters.brand === "" ||
          veiculo.brand.toLowerCase().includes(filters.brand.toLowerCase()))
      );
    });
    setFilteredVehicles(filtered);
  }, [filters, veiculos]);

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
          className="text-center fs-3"
          style={{ fontWeight: "bold", color: "#333" }}
        >
          Todos os Veículos 🚗💨
        </h2>
        <div className="row">
          {/* Filtro */}
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
                name="year"
                placeholder="Ano"
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
                name="brand"
                placeholder="Marca"
                className="form-control mb-2"
                onChange={handleFilterChange}
              />
            </div>
          </div>
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
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{veiculo.carName}</h5>
                        <p className="card-text">
                          {veiculo.model} - {veiculo.year} - {veiculo.color}
                        </p>
                        <p className="fw-bold text-danger">
                          R$ {veiculo.price.toLocaleString()}
                        </p>
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
