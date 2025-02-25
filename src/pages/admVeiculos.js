import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Alert, Table, Modal, Button, Carousel } from "react-bootstrap";
import VeiculoForm from "../components/VeiculoForm";
import HeaderAdm from "../components/Headeradm";
import API_BASE_URL from "../services/api"; // 🔹 Importação correta da URL da API

function AdmVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editingVeiculo, setEditingVeiculo] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  // 🔹 Buscar veículos cadastrados
  const fetchVeiculos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      if (!res.ok) throw new Error("Erro ao buscar veículos");

      const data = await res.json();
      console.log("🚗 Veículos carregados:", data); // Debugging
      setVeiculos(data);
    } catch (error) {
      console.error("❌ Erro ao buscar veículos:", error);
      setAlertMessage({ type: "danger", text: "❌ Erro ao buscar veículos." });
    }
  };

  // 🔹 Excluir veículo
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      try {
        await fetch(`${API_BASE_URL}/api/vehicles/${id}`, {
          method: "DELETE",
        });
        setAlertMessage({
          type: "success",
          text: "✅ Veículo excluído com sucesso!",
        });
        fetchVeiculos(); // Atualiza a lista
      } catch (error) {
        setAlertMessage({
          type: "danger",
          text: "❌ Erro ao excluir veículo.",
        });
      }
    }
  };

  // 🔹 Editar veículo
  const handleEdit = (veiculo) => {
    setEditingVeiculo(veiculo);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  // 🔹 Abrir Modal de Detalhes
  const handleShowModal = (veiculo) => {
    setSelectedVehicle(veiculo);
    setShowModal(true);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="container my-5">
      <HeaderAdm />

      {alertMessage && (
        <Alert
          variant={alertMessage.type}
          className="text-center"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          {alertMessage.text}
        </Alert>
      )}

      <div ref={formRef}>
        <VeiculoForm
          onSubmit={fetchVeiculos}
          editingVeiculo={editingVeiculo}
          setEditingVeiculo={setEditingVeiculo}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-center mb-3">Lista de Veículos Cadastrados</h3>

        {veiculos.length === 0 ? (
          <p className="text-center">Nenhum veículo cadastrado.</p>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ano</th>
                  <th>Cor</th>
                  <th>Quilometragem</th>
                  <th>Preço</th>
                  <th>Opcionais</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {veiculos.map((veiculo) => (
                  <tr key={veiculo.id}>
                    <td>
                      {veiculo.images?.length > 0 ? (
                        <img
                          src={
                            veiculo.images[0].startsWith("http")
                              ? veiculo.images[0]
                              : `${API_BASE_URL}/${veiculo.images[0]}`
                          }
                          alt={veiculo.carName}
                          style={{
                            width: "150px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShowModal(veiculo)}
                        />
                      ) : (
                        "Sem Imagem"
                      )}
                    </td>
                    <td>{veiculo.carName}</td>
                    <td>{veiculo.brand}</td>
                    <td>{veiculo.model}</td>
                    <td>{veiculo.year}</td>
                    <td>{veiculo.color}</td>
                    <td>{veiculo.mileage.toLocaleString()} km</td>
                    <td className="text-danger fw-bold">
                      R$ {veiculo.price.toLocaleString()}
                    </td>
                    <td>{veiculo.options || "Nenhum"}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEdit(veiculo)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(veiculo.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdmVeiculos;
