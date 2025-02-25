import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Alert, Button } from "react-bootstrap";
import VeiculoForm from "../components/VeiculoForm";
import API_BASE_URL from "../services/api";

function AdmVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editingVeiculo, setEditingVeiculo] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vehicles`);
      if (!res.ok) throw new Error("Erro ao buscar veículos");

      const data = await res.json();
      setVeiculos(data);
    } catch (error) {
      setAlertMessage({ type: "danger", text: "❌ Erro ao buscar veículos." });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      await fetch(`${API_BASE_URL}/api/vehicles/${id}`, { method: "DELETE" });
      fetchVeiculos();
    }
  };

  return (
    <div className="container my-5">
      {alertMessage && (
        <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
      )}

      <VeiculoForm
        onSubmit={fetchVeiculos}
        editingVeiculo={editingVeiculo}
        setEditingVeiculo={setEditingVeiculo}
      />

      <Table striped bordered hover className="text-center mt-4">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ano</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>
                {veiculo.images?.length > 0 ? (
                  <img
                    src={`${API_BASE_URL}${veiculo.images[0]}`}
                    width="100"
                    alt="veículo"
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                ) : (
                  "Sem Imagem"
                )}
              </td>
              <td>{veiculo.carName}</td>
              <td>R$ {veiculo.price.toLocaleString()}</td>
              <td>{veiculo.year}</td>
              <td>{veiculo.brand}</td>
              <td>{veiculo.model}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => setEditingVeiculo(veiculo)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(veiculo.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdmVeiculos;
