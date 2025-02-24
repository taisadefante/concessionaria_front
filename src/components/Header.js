import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HoverLink = ({
  to,
  isScrollLink = false,
  children,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isScrollLink) {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("contato")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
    if (onClick) onClick(e);
  };

  return (
    <Link
      to={to}
      className="nav-link"
      onClick={handleClick}
      style={{
        color: "#bbb",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }} // Cor padrão cinza
      onMouseEnter={(e) => (e.target.style.color = "#fff")} // Hover branco
      onMouseLeave={(e) => (e.target.style.color = "#bbb")} // Volta para cinza ao sair
      {...props}
    >
      {children}
    </Link>
  );
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🔹 Função para voltar ao topo ao clicar na Home ou na Logo
  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          backgroundColor: "#343a40",
          color: "#fff",
          padding: "8px 0",
          zIndex: "1000",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-2">
            {/* 🔹 Logo volta para o topo ao clicar */}
            <div>
              <Link to="/" className="navbar-brand" onClick={scrollToTop}>
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  style={{ maxWidth: "150px", cursor: "pointer" }}
                />
              </Link>
            </div>

            {/* Menu (Desktop) */}
            <nav className="d-none d-md-block">
              <ul className="nav mx-auto">
                <li className="nav-item me-3">
                  <HoverLink to="/" onClick={scrollToTop}>
                    Home
                  </HoverLink>
                </li>
                <li className="nav-item me-3">
                  <HoverLink to="/veiculos">Veículos</HoverLink>
                </li>
                <li className="nav-item me-3">
                  <HoverLink to="/sobre">Sobre</HoverLink>
                </li>
                <li className="nav-item">
                  <HoverLink to="/" isScrollLink={true}>
                    Contato
                  </HoverLink>
                </li>
              </ul>
            </nav>

            {/* Redes Sociais (Desktop) */}
            <div className="d-none d-md-flex align-items-center">
              <a
                href="https://www.instagram.com/seu_usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-instagram social-icon"></i>
              </a>
              <a
                href="https://www.facebook.com/seu_usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-facebook social-icon"></i>
              </a>
              <a
                href="https://wa.me/21988359825"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp social-icon"></i>
              </a>
            </div>

            {/* Botão do Menu Mobile */}
            <div className="d-md-none">
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "24px",
                }}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Menu Mobile Expandido */}
          {isOpen && (
            <div className="d-md-none bg-dark p-3">
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <HoverLink
                    to="/"
                    onClick={() => {
                      scrollToTop();
                      setIsOpen(false);
                    }}
                  >
                    Home
                  </HoverLink>
                </li>
                <li className="nav-item mb-2">
                  <HoverLink to="/veiculos" onClick={() => setIsOpen(false)}>
                    Veículos
                  </HoverLink>
                </li>
                <li className="nav-item mb-2">
                  <HoverLink to="/sobre" onClick={() => setIsOpen(false)}>
                    Sobre
                  </HoverLink>
                </li>
                <li className="nav-item">
                  <HoverLink
                    to="/"
                    isScrollLink={true}
                    onClick={() => setIsOpen(false)}
                  >
                    Contato
                  </HoverLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* 🔹 Estilos extras para os ícones */}
        <style>
          {`
            .social-icon {
              font-size: 24px;
              color: #bbb;
              transition: color 0.3s ease;
            }
            .social-icon:hover {
              color: #fff;
            }

            /* Adiciona espaço abaixo do header para evitar sobreposição */
            body {
              padding-top: 70px;
            }
          `}
        </style>
      </header>
    </>
  );
}

export default Header;
