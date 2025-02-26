import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Alert, Button, Carousel, Card } from "react-bootstrap";
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
    <div className="container-fluid my-5">
      {alertMessage && (
        <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
      )}

      <VeiculoForm
        onSubmit={fetchVeiculos}
        editingVeiculo={editingVeiculo}
        setEditingVeiculo={setEditingVeiculo}
      />

      {/* ✅ Exibição da tabela apenas em telas médias e grandes */}
      <div
        className="table-responsive d-none d-md-block"
        style={{ overflowX: "auto" }}
      >
        <Table striped bordered hover className="text-center mt-4">
          <thead className="table-dark">
            <tr>
              <th>Imagens</th>
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
                    <Carousel
                      indicators={false}
                      interval={null}
                      style={{ width: "100px" }}
                    >
                      {veiculo.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={`${API_BASE_URL}${img}`}
                            width="100"
                            height="70"
                            alt={`Veículo ${index + 1}`}
                            style={{
                              objectFit: "cover",
                              borderRadius: "5px",
                              width: "100%",
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "70px",
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
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
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <Button
                      variant="warning"
                      onClick={() => setEditingVeiculo(veiculo)}
                      style={{ padding: "5px 10px" }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(veiculo.id)}
                      style={{ padding: "5px 10px" }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* ✅ Exibição em cards apenas em telas pequenas */}
      <div className="d-md-none">
        {veiculos.map((veiculo) => (
          <Card key={veiculo.id} className="mb-3">
            {veiculo.images?.length > 0 ? (
              <Carousel indicators={false} interval={null}>
                {veiculo.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={`${API_BASE_URL}${img}`}
                      className="d-block w-100"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                      alt={`Veículo ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div
                style={{
                  height: "200px",
                  backgroundColor: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                Sem Imagem
              </div>
            )}
            <Card.Body>
              <Card.Title>{veiculo.carName}</Card.Title>
              <Card.Text>
                <strong>Preço:</strong> R$ {veiculo.price.toLocaleString()}{" "}
                <br />
                <strong>Ano:</strong> {veiculo.year} <br />
                <strong>Marca:</strong> {veiculo.brand} <br />
                <strong>Modelo:</strong> {veiculo.model} <br />
                <strong>Quilometragem:</strong> {veiculo.mileage} km <br />
                <strong>Cor:</strong> {veiculo.color} <br />
                <strong>Opcionais:</strong> {veiculo.options || "Nenhum"}
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button
                  variant="warning"
                  onClick={() => setEditingVeiculo(veiculo)}
                  style={{ padding: "5px 10px" }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(veiculo.id)}
                  style={{ padding: "5px 10px" }}
                >
                  <FaTrash />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdmVeiculos;
