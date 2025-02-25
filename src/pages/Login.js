import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Se o usuário já está autenticado, redireciona automaticamente
    if (user) {
      navigate("/admveiculos");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "taisadefante@hotmail.com" && password === "Tais1979*") {
      login({ email });
      navigate("/admveiculos"); // Redireciona após login
    } else {
      alert("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="login-page">
      <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <Row className="w-100">
          {/* Lado esquerdo com logo */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center bg-dark text-white p-5"
          >
            <div className="text-center">
              <img
                src="/img/logo.png"
                alt="Logo da Empresa"
                className="img-fluid mb-4"
                style={{ maxWidth: "250px" }}
              />
              <h3>Bem-vindo à nossa plataforma</h3>
              <p>Faça login para acessar o sistema.</p>
            </div>
          </Col>

          {/* Lado direito com o formulário */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Card
              className="shadow p-4"
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <Card.Body>
                <h4 className="text-center mb-4">Acesse sua conta</h4>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="dark" type="submit" className="w-100">
                    Entrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="text-center text-white bg-dark py-3 fixed-bottom">
        © {new Date().getFullYear()} - Todos os direitos reservados
      </footer>
    </div>
  );
}

export default Login;
