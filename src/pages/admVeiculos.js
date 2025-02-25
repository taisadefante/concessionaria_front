import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Alert, Button } from "react-bootstrap";
import VeiculoForm from "../components/VeiculoForm";
import API_BASE_URL from "../services/api";
import HeaderAdm from "../components/Headeradm";

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
    <div className="container-fluid my-5">
      <HeaderAdm />
      {alertMessage && (
        <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
      )}

      <VeiculoForm
        onSubmit={fetchVeiculos}
        editingVeiculo={editingVeiculo}
        setEditingVeiculo={setEditingVeiculo}
      />

      <div className="table-responsive">
        <Table
          striped
          bordered
          hover
          className="text-center mt-4"
          style={{ width: "100%" }}
        >
          <thead className="table-dark">
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ano</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Quilometragem</th>
              <th>Cor</th>
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
                      src={`${API_BASE_URL}${veiculo.images[0]}`}
                      width="100"
                      alt="veículo"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#ccc",
                      }}
                    >
                      Sem Imagem
                    </div>
                  )}
                </td>
                <td>{veiculo.carName}</td>
                <td>{veiculo.description}</td>
                <td>R$ {veiculo.price.toLocaleString()}</td>
                <td>{veiculo.year}</td>
                <td>{veiculo.brand}</td>
                <td>{veiculo.model}</td>
                <td>{veiculo.mileage} km</td>
                <td>{veiculo.color}</td>
                <td>{veiculo.options || "Nenhum"}</td>
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
    </div>
  );
}

export default AdmVeiculos;
