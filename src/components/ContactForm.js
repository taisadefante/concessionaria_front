import React, { useState } from "react";

function ContactForm() {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      id="contato" // 🔹 ALTERADO de "contact" para "contato"
      style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row">
          {/* Coluna esquerda: Informações de Contato */}
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded bg-white shadow-sm">
              <h2
                style={{
                  marginBottom: "15px",
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Contatos
              </h2>{" "}
              <p style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
                <strong>Endereço:</strong> Rua Exemplo, 123, Bairro, Cidade,
                Estado.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
                <strong>Telefone:</strong> (XX) XXXX-XXXX
              </p>
              <div className="d-flex align-items-center justify-content-center">
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                >
                  <i
                    className="bi bi-instagram"
                    style={{ fontSize: "24px", color: "#6c757d" }}
                  ></i>
                </a>
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                >
                  <i
                    className="bi bi-facebook"
                    style={{ fontSize: "24px", color: "#6c757d" }}
                  ></i>
                </a>
                <a
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="bi bi-whatsapp"
                    style={{ fontSize: "24px", color: "#6c757d" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
          {/* Coluna direita: Formulário de Contato */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2
                  style={{
                    marginBottom: "15px",
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Envia sua Mensagem
                </h2>{" "}
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome *"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="E-mail *"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Telefone *"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Mensagem *"
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: btnHover ? "#343a40" : "#6c757d",
                        color: "#fff",
                        border: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
