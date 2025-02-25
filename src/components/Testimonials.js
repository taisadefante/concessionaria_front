import React from "react";
import { Carousel } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

function Testimonials() {
  // 🔹 Verifica se a tela é menor que 768px (modo mobile)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 🔹 Lista de depoimentos
  const testimonials = [
    {
      text: `"O Rafael foi atencioso, me buscou no aeroporto e garantiu toda comodidade e conforto no almoço, no transfer, na visita ao veículo e durante o test-drive."`,
      author: "João da Silva",
    },
    {
      text: `"Excelente atendimento e suporte durante todo o processo de compra. Recomendo fortemente!"`,
      author: "Maria Oliveira",
    },
  ];

  return (
    <section style={{ backgroundColor: "#f8f9fa", padding: "40px 0" }}>
      <div className="container">
        <h2
          style={{
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          Depoimentos
        </h2>

        {/* 🔹 Modo Desktop: Depoimentos lado a lado */}
        {!isMobile ? (
          <div className="row justify-content-center gap-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="col-md-5 col-sm-12 d-flex align-items-stretch"
              >
                <div className="card h-100 mb-3 shadow-sm">
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{testimonial.text}</p>
                      <footer className="blockquote-footer">
                        {testimonial.author}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 🔹 Modo Mobile: Carrossel automático */
          <Carousel indicators={false} controls={false} interval={3000}>
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  <div className="card shadow-sm" style={{ maxWidth: "90%" }}>
                    <div className="card-body text-center">
                      <blockquote className="blockquote mb-0">
                        <p>{testimonial.text}</p>
                        <footer className="blockquote-footer">
                          {testimonial.author}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
