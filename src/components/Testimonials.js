import React from "react";

function Testimonials() {
  return (
    <section style={{ backgroundColor: "#f8f9fa", padding: "40px 0" }}>
      <div className="container">
        <div className="row justify-content-center gap-1">
          {/* Cabeçalho de Depoimentos */}
          <div className="col-12">
            <h2 className="text-center mb-4">Depoimentos</h2>
          </div>

          {/* Depoimento 1 */}
          <div
            className="col-md-5 mx-0 d-flex align-items-stretch"
            style={{ maxWidth: "49%" }}
          >
            <div className="card h-100 mb-3">
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>
                    "O Rafael foi atencioso, me buscou no aeroporto e garantiu
                    toda comodidade e conforto no almoço, no transfer, na visita
                    ao veículo e durante o test-drive."
                  </p>
                  <footer className="blockquote-footer">João da Silva</footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Depoimento 2 */}
          <div
            className="col-md-5 mx-0 d-flex align-items-stretch"
            style={{ maxWidth: "49%" }}
          >
            <div className="card h-100 mb-3">
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>
                    "Excelente atendimento e suporte durante todo o processo de
                    compra. Recomendo fortemente!"
                  </p>
                  <footer className="blockquote-footer">Maria Oliveira</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
