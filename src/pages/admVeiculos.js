import { useState, useEffect, useRef } from "react";
import { Table, Alert } from "react-bootstrap";
import VeiculoForm from "../components/VeiculoForm";
import HeaderAdm from "../components/Headeradm";
import API_BASE_URL from "../services/api";

function AdmVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editingVeiculo, setEditingVeiculo] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const formRef = useRef(null);

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
      console.error("❌ Erro ao buscar veículos:", error);
      setAlertMessage({ type: "danger", text: "❌ Erro ao buscar veículos." });
    }
  };

  return (
    <div className="container my-5">
      <HeaderAdm />
      {alertMessage && (
        <Alert variant={alertMessage.type} className="text-center">
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>
                {veiculo.images?.length > 0 ? (
                  <img
                    src={`${API_BASE_URL}${veiculo.images[0]}`}
                    alt={veiculo.carName}
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "cover",
                    }}
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
              <td>R$ {veiculo.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdmVeiculos;
